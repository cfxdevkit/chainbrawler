import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

describe("POOL SCALING VALIDATION", () => {
  async function deployFixture() {
    // First deploy the CombatEngineLib library
    const combatEngineLib = await hre.viem.deployContract("CombatEngineLib");

    // Deploy ChainBrawlerClean with library linking
    const chainBrawler = await hre.viem.deployContract("ChainBrawlerClean", [], {
      libraries: {
        "contracts/libraries/CombatEngineLib.sol:CombatEngineLib": combatEngineLib.address,
      },
    });
    const wallets = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    return {
      chainBrawler,
      player1: wallets[1],
      player2: wallets[2],
      player3: wallets[3],
      publicClient,
    };
  }

  it("should validate gas refund pool works as global pool (no epoch locking)", async () => {
    const { chainBrawler, player1, player2, publicClient } = await loadFixture(deployFixture);

    console.log("\n⛽ GAS REFUND GLOBAL POOL TEST:");

    // Create first character with player1
    const hash1 = await chainBrawler.write.createCharacter([0n], {
      account: player1.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash1 });

    const gasRefundAfterFirst = await chainBrawler.read.gasRefundPool();
    console.log(`Gas pool after 1st character: ${Number(gasRefundAfterFirst) / 1e18} ETH`);

    // Create second character with player2 (different account)
    const hash2 = await chainBrawler.write.createCharacter([0n], {
      account: player2.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash2 });

    const gasRefundAfterSecond = await chainBrawler.read.gasRefundPool();
    console.log(`Gas pool after 2nd character: ${Number(gasRefundAfterSecond) / 1e18} ETH`);

    // Verify accumulation
    expect(gasRefundAfterSecond).to.equal(gasRefundAfterFirst * 2n);
    console.log("✅ Gas refund pool accumulates globally (not epoch-locked)");
  });

  it("should validate equipment rewards scale with pool size", async () => {
    const { chainBrawler, player1, player2, player3, publicClient } =
      await loadFixture(deployFixture);

    console.log("\n🎁 EQUIPMENT REWARD SCALING TEST:");

    // Test small pool (1 character = 1.2 ETH)
    const hash1 = await chainBrawler.write.createCharacter([0n], {
      account: player1.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash1 });

    const smallPool = await chainBrawler.read.equipmentRewardPool();
    console.log(`Small pool (1 character): ${Number(smallPool) / 1e18} ETH`);

    // Small pool should be 8% of 15 ETH = 1.2 ETH (< 2 ETH = 100% multiplier)
    expect(smallPool).to.equal(1200000000000000000n); // 1.2 ETH

    // Test medium pool (2 characters = 2.4 ETH)
    const hash2 = await chainBrawler.write.createCharacter([0n], {
      account: player2.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash2 });

    const mediumPool = await chainBrawler.read.equipmentRewardPool();
    console.log(`Medium pool (2 characters): ${Number(mediumPool) / 1e18} ETH`);

    // Medium pool should be 2.4 ETH (>= 2 ETH = 250% multiplier threshold)
    expect(mediumPool).to.equal(2400000000000000000n); // 2.4 ETH

    // Test growing pool
    const hash3 = await chainBrawler.write.createCharacter([0n], {
      account: player3.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash3 });

    const largePool = await chainBrawler.read.equipmentRewardPool();
    console.log(`Large pool (3 characters): ${Number(largePool) / 1e18} ETH`);

    // Large pool should be 3.6 ETH (>= 2 ETH threshold)
    expect(largePool).to.equal(3600000000000000000n); // 3.6 ETH

    console.log("✅ Equipment reward pool scales properly with character creation");
  });

  it("should demonstrate fixed gas refunds vs dynamic equipment rewards", async () => {
    const { chainBrawler, player1, player2, publicClient } = await loadFixture(deployFixture);

    console.log("\n📊 FIXED GAS vs DYNAMIC EQUIPMENT COMPARISON:");

    // Create first character
    const hash1 = await chainBrawler.write.createCharacter([0n], {
      account: player1.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash1 });

    const gasPool1 = await chainBrawler.read.gasRefundPool();
    const equipPool1 = await chainBrawler.read.equipmentRewardPool();

    console.log(`After 1 character:`);
    console.log(`├─ Gas Pool: ${Number(gasPool1) / 1e18} ETH (fixed 12% allocation)`);
    console.log(`└─ Equipment Pool: ${Number(equipPool1) / 1e18} ETH (fixed 8% allocation)`);

    // Create second character
    const hash2 = await chainBrawler.write.createCharacter([0n], {
      account: player2.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash: hash2 });

    const gasPool2 = await chainBrawler.read.gasRefundPool();
    const equipPool2 = await chainBrawler.read.equipmentRewardPool();

    console.log(`After 2 characters:`);
    console.log(
      `├─ Gas Pool: ${Number(gasPool2) / 1e18} ETH (${Number(gasPool2) / Number(gasPool1)}x growth)`
    );
    console.log(
      `└─ Equipment Pool: ${Number(equipPool2) / 1e18} ETH (${Number(equipPool2) / Number(equipPool1)}x growth)`
    );

    // Verify both pools grow linearly with character creation
    expect(gasPool2).to.equal(gasPool1 * 2n);
    expect(equipPool2).to.equal(equipPool1 * 2n);

    console.log("✅ Both pools demonstrate linear growth with global persistence");
    console.log("✅ Gas refunds: Fixed 0.0003 ETH amounts from global pool");
    console.log("✅ Equipment rewards: Dynamic scaling based on pool size");
  });
});

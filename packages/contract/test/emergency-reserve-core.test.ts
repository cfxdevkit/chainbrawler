import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

describe("EMERGENCY RESERVE CORE ALLOCATION TEST", () => {
  async function deployFixture() {
    // First deploy the CombatEngineLib library
    const combatEngineLib = await hre.viem.deployContract("CombatEngineLib");

    // Deploy ChainBrawlerClean with library linking
    const chainBrawler = await hre.viem.deployContract("ChainBrawlerClean", [], {
      libraries: {
        "contracts/libraries/CombatEngineLib.sol:CombatEngineLib": combatEngineLib.address,
      },
    });
    const [admin, player1, player2] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    return { chainBrawler, admin, player1, player2, publicClient };
  }

  it("should correctly implement the 5-way fund allocation with Emergency Reserve", async () => {
    const { chainBrawler, player1, publicClient } = await loadFixture(deployFixture);

    // Create character with 15 ETH fee
    const creationFee = 15000000000000000000n; // 15 ETH
    const hash = await chainBrawler.write.createCharacter([0n], {
      account: player1.account,
      value: creationFee,
    });
    await publicClient.waitForTransactionReceipt({ hash });

    // Read all fund allocations
    const developerFund = await chainBrawler.read.developerFund();
    const prizePool = await chainBrawler.read.prizePool();
    const gasRefundPool = await chainBrawler.read.gasRefundPool();
    const equipmentRewardPool = await chainBrawler.read.equipmentRewardPool();
    const nextEpochReserve = await chainBrawler.read.nextEpochReserve();
    const emergencyReserve = await chainBrawler.read.emergencyReserve();

    console.log("\n🏦 COMPLETE FUND ALLOCATION BREAKDOWN 🏦");
    console.log(`💰 Total Creation Fee: ${Number(creationFee) / 1e18} ETH`);
    console.log(`\n📊 ALLOCATION BREAKDOWN:`);
    console.log(
      `├─ 👨‍💻 Developer Fund: ${Number(developerFund) / 1e18} ETH (${((Number(developerFund) * 100) / Number(creationFee)).toFixed(1)}%)`
    );
    console.log(
      `├─ 🎯 Prize Pool: ${Number(prizePool) / 1e18} ETH (${((Number(prizePool) * 100) / Number(creationFee)).toFixed(1)}%)`
    );
    console.log(
      `├─ ⛽ Gas Refund Pool: ${Number(gasRefundPool) / 1e18} ETH (${((Number(gasRefundPool) * 100) / Number(creationFee)).toFixed(1)}%)`
    );
    console.log(
      `├─ 🎁 Equipment Reward Pool: ${Number(equipmentRewardPool) / 1e18} ETH (${((Number(equipmentRewardPool) * 100) / Number(creationFee)).toFixed(1)}%)`
    );
    console.log(
      `├─ 🔄 Next Epoch Reserve: ${Number(nextEpochReserve) / 1e18} ETH (${((Number(nextEpochReserve) * 100) / Number(creationFee)).toFixed(1)}%)`
    );
    console.log(
      `└─ 🚨 Emergency Reserve: ${Number(emergencyReserve) / 1e18} ETH (${((Number(emergencyReserve) * 100) / Number(creationFee)).toFixed(1)}%)`
    );

    // Verify allocation percentages
    expect(developerFund).to.equal(3000000000000000000n); // 20% = 3 ETH
    expect(prizePool).to.equal(7200000000000000000n); // 60% of 80% = 48% = 7.2 ETH
    expect(gasRefundPool).to.equal(1800000000000000000n); // 15% of 80% = 12% = 1.8 ETH

    // Verify exact allocations
    expect(developerFund).to.equal(3000000000000000000n); // 20% = 3 ETH
    expect(prizePool).to.equal(7200000000000000000n); // 60% of 80% = 48% = 7.2 ETH
    expect(gasRefundPool).to.equal(1800000000000000000n); // 15% of 80% = 12% = 1.8 ETH
    expect(equipmentRewardPool).to.equal(1200000000000000000n); // 10% of 80% = 8% = 1.2 ETH
    expect(nextEpochReserve).to.equal(1200000000000000000n); // 10% of 80% = 8% = 1.2 ETH
    expect(emergencyReserve).to.equal(600000000000000000n); // 5% of 80% = 4% = 0.6 ETH

    // Verify total adds up perfectly
    const total =
      developerFund +
      prizePool +
      gasRefundPool +
      equipmentRewardPool +
      nextEpochReserve +
      emergencyReserve;
    expect(total).to.equal(creationFee);

    console.log(`\n✅ VERIFICATION COMPLETE:`);
    console.log(`📝 Total Allocated: ${Number(total) / 1e18} ETH`);
    console.log(`📝 Original Fee: ${Number(creationFee) / 1e18} ETH`);
    console.log(`📝 Perfect Match: ${total === creationFee ? "✅ YES" : "❌ NO"}`);
    console.log(`\n🎉 Emergency Reserve is now ACTIVE and receiving 4% of all fees!`);
  });

  it("should accumulate Emergency Reserve from multiple players", async () => {
    const { chainBrawler, player1, player2, publicClient } = await loadFixture(deployFixture);

    // Player 1 creates character
    let hash = await chainBrawler.write.createCharacter([0n], {
      account: player1.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash });

    const reserveAfterPlayer1 = await chainBrawler.read.emergencyReserve();

    // Player 2 creates character
    hash = await chainBrawler.write.createCharacter([0n], {
      account: player2.account,
      value: 15000000000000000000n, // 15 ETH
    });
    await publicClient.waitForTransactionReceipt({ hash });

    const reserveAfterPlayer2 = await chainBrawler.read.emergencyReserve();

    console.log("\n🔄 EMERGENCY RESERVE ACCUMULATION:");
    console.log(`After Player 1 (15 ETH): ${Number(reserveAfterPlayer1) / 1e18} ETH`);
    console.log(`After Player 2 (30 ETH total): ${Number(reserveAfterPlayer2) / 1e18} ETH`);

    // Verify accumulation
    expect(reserveAfterPlayer1).to.equal(600000000000000000n); // 0.6 ETH
    expect(reserveAfterPlayer2).to.equal(1200000000000000000n); // 1.2 ETH
    expect(reserveAfterPlayer2).to.equal(reserveAfterPlayer1 * 2n);

    console.log("✅ Emergency Reserve accumulates correctly across multiple players!");
  });

  it("should maintain proper ratio in new allocation system", async () => {
    const { chainBrawler, player1, publicClient } = await loadFixture(deployFixture);

    // Test with character creation fee (15 ETH)
    const creationFee = 15000000000000000000n; // 15 ETH

    // Create character with correct fee
    const hash = await chainBrawler.write.createCharacter([0n], {
      account: player1.account,
      value: creationFee,
    });
    await publicClient.waitForTransactionReceipt({ hash });

    const emergencyReserve = await chainBrawler.read.emergencyReserve();

    // Emergency reserve should be 4% of the fee
    // Fee allocation: 20% dev, 80% game funds
    // Emergency reserve gets 4% of total fee (not 5% of 80%)
    const expectedEmergencyReserve = (creationFee * 4n) / 100n; // 4% of 15 ETH = 0.6 ETH

    console.log(`\nCharacter Creation Fee: ${Number(creationFee) / 1e18} ETH`);
    console.log(`Expected Emergency allocation: ${Number(expectedEmergencyReserve) / 1e18} ETH`);
    console.log(`Actual Emergency Reserve: ${Number(emergencyReserve) / 1e18} ETH`);

    expect(emergencyReserve).to.equal(expectedEmergencyReserve);

    console.log("\n✅ Emergency Reserve maintains proper 4% allocation ratio!");
  });
});

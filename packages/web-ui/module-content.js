import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/@fs/workspaces/chainbrawler_dev/packages/react-ui/dist/index.js");import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

let prevRefreshReg;
let prevRefreshSig;

if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/workspaces/chainbrawler_dev/packages/react-ui/dist/index.js");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}

var _s = $RefreshSig$(),
  _s2 = $RefreshSig$(),
  _s3 = $RefreshSig$(),
  _s4 = $RefreshSig$(),
  _s5 = $RefreshSig$(),
  _s6 = $RefreshSig$(),
  _s7 = $RefreshSig$(),
  _s8 = $RefreshSig$();
import __vite__cjsImport2_react from "/node_modules/.vite/deps/react.js?v=e4404076"; const useMemo = __vite__cjsImport2_react["useMemo"]; const useState = __vite__cjsImport2_react["useState"]; const useEffect = __vite__cjsImport2_react["useEffect"];
import { useMediaQuery } from "/node_modules/.vite/deps/@mantine_hooks.js?v=e4404076";
import __vite__cjsImport4_react_jsxRuntime from "/node_modules/.vite/deps/react_jsx-runtime.js?v=e4404076"; const jsx = __vite__cjsImport4_react_jsxRuntime["jsx"]; const Fragment = __vite__cjsImport4_react_jsxRuntime["Fragment"];

// src/hooks/useCharacterStats.ts
function useCharacterStats(character) {
  _s();
  return useMemo(() => {
    if (!character?.exists) {
      return {
        combat: 0,
        defense: 0,
        luck: 0,
        total: 0,
        level: 0,
        experience: 0,
        health: {
          current: 0,
          max: 0,
          percentage: 0
        },
        isAlive: false,
        inCombat: false
      };
    }
    const combat = character.stats?.combat || 0;
    const defense = character.stats?.defense || 0;
    const luck = character.stats?.luck || 0;
    const total = combat + defense + luck;
    const healthCurrent = character.endurance?.current || 0;
    const healthMax = character.endurance?.max || 0;
    const healthPercentage = healthMax > 0 ? healthCurrent / healthMax * 100 : 0;
    return {
      combat,
      defense,
      luck,
      total,
      level: character.level || 0,
      experience: character.experience || 0,
      health: {
        current: healthCurrent,
        max: healthMax,
        percentage: healthPercentage
      },
      isAlive: character.isAlive,
      inCombat: character.inCombat
    };
  }, [character]);
}
_s(useCharacterStats, "nwk+m61qLgjDVUp4IGV/072DDN4=");
function useMobileOptimization() {
  _s2();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const mobileQuery = useMediaQuery("(max-width: 768px)");
  const tabletQuery = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const desktopQuery = useMediaQuery("(min-width: 1025px)");
  useEffect(() => {
    setIsMobile(mobileQuery || false);
    setIsTablet(tabletQuery || false);
    setIsDesktop(desktopQuery || false);
  }, [mobileQuery, tabletQuery, desktopQuery]);
  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");
    };
    handleOrientationChange();
    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);
  return {
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    isTouchDevice: "ontouchstart" in window || navigator.maxTouchPoints > 0
  };
}
_s2(useMobileOptimization, "7lW7pYEyZZl5/vtCAch8fUaQOUo=", false, function () {
  return [useMediaQuery, useMediaQuery, useMediaQuery];
});
function usePerformance() {
  _s3();
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [memoryUsage, setMemoryUsage] = useState(0);
  useEffect(() => {
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 4;
    setIsLowEnd(isLowEndDevice);
    if ("memory" in performance) {
      const updateMemory = () => {
        setMemoryUsage(performance.memory.usedJSHeapSize);
      };
      updateMemory();
      const interval = setInterval(updateMemory, 5e3);
      return () => clearInterval(interval);
    }
  }, []);
  return {
    isLowEnd,
    memoryUsage,
    shouldReduceAnimations: isLowEnd,
    shouldLazyLoad: isLowEnd
  };
}
_s3(usePerformance, "HSO1ga2785D7KXTAeOMwOk2GtK0=");
function useGameColors() {
  _s4();
  return useMemo(() => ({
    health: {
      light: "#f0f9f0",
      base: "#22c55e",
      dark: "#15803d",
      getByPercentage: percentage => {
        if (percentage >= 70) return "#22c55e";
        if (percentage >= 30) return "#f59e0b";
        if (percentage > 0) return "#ef4444";
        return "#6b7280";
      }
    },
    mana: {
      light: "#f0f9ff",
      base: "#0ea5e9",
      dark: "#0c4a6e"
    },
    experience: {
      light: "#fffbeb",
      base: "#f59e0b",
      dark: "#78350f"
    },
    combat: {
      light: "#fef2f2",
      base: "#ef4444",
      dark: "#7f1d1d"
    },
    defense: {
      light: "#eff6ff",
      base: "#3b82f6",
      dark: "#1e3a8a"
    },
    luck: {
      light: "#faf5ff",
      base: "#a855f7",
      dark: "#581c87"
    },
    rarity: {
      common: "#9ca3af",
      // Gray
      uncommon: "#22c55e",
      // Green
      rare: "#3b82f6",
      // Blue
      epic: "#a855f7",
      // Purple
      legendary: "#f59e0b"
      // Orange
    },
    status: {
      success: "#22c55e",
      // Green
      warning: "#f59e0b",
      // Orange
      error: "#ef4444",
      // Red
      info: "#3b82f6"
      // Blue
    }
  }), []);
}
_s4(useGameColors, "nwk+m61qLgjDVUp4IGV/072DDN4=");
function useGameTheme() {
  _s5();
  return useMemo(() => ({
    colors: {
      health: "#22c55e",
      mana: "#0ea5e9",
      experience: "#f59e0b",
      combat: "#ef4444",
      defense: "#3b82f6",
      luck: "#a855f7"
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    breakpoints: {
      xs: "0px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1200px"
    }
  }), []);
}

// src/utils/mobile.ts
_s5(useGameTheme, "nwk+m61qLgjDVUp4IGV/072DDN4=");
function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function isTabletDevice() {
  if (typeof window === "undefined") return false;
  return /iPad|Android(?=.*\bMobile\b)/i.test(navigator.userAgent);
}
function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function getTouchTargetSize(size = "md") {
  const sizes = {
    xs: 32,
    // Minimum for very small elements
    sm: 40,
    // Small buttons
    md: 44,
    // Standard mobile touch target (iOS/Android)
    lg: 48,
    // Large buttons
    xl: 56
    // Extra large buttons
  };
  return sizes[size];
}
function getMinTouchTargetSize() {
  return 44;
}

// src/utils/formatting.ts
function formatHealthPercentage(current, max) {
  return max > 0 ? Math.round(current / max * 100) : 0;
}
function getHealthStatus(percentage) {
  if (percentage >= 70) return "healthy";
  if (percentage >= 30) return "warning";
  if (percentage > 0) return "critical";
  return "dead";
}
function formatExperience(experience) {
  if (experience >= 1e6) {
    return `${(experience / 1e6).toFixed(1)}M`;
  }
  if (experience >= 1e3) {
    return `${(experience / 1e3).toFixed(1)}K`;
  }
  return experience.toString();
}
function formatExperienceChange(change) {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${formatExperience(Math.abs(change))}`;
}
function formatDamage(damage) {
  return damage.toString();
}
function formatDamageChange(damage) {
  return `-${formatDamage(damage)}`;
}
function formatHealing(healing) {
  return `+${healing}`;
}
function getHealthColor(percentage) {
  if (percentage >= 70) return "green";
  if (percentage >= 30) return "yellow";
  if (percentage > 0) return "red";
  return "gray";
}
function getHealthColorIntensity(percentage) {
  if (percentage >= 70) return 1;
  if (percentage >= 30) return 0.7;
  if (percentage > 0) return 0.5;
  return 0.3;
}
function PerformanceBoundary({
  children,
  fallback,
  enablePerformanceMode = true
}) {
  _s6();
  const {
    isLowEnd
  } = usePerformance();
  if (enablePerformanceMode && isLowEnd && fallback) {
    return /* @__PURE__ */jsx(Fragment, {
      children: fallback
    });
  }
  return /* @__PURE__ */jsx(Fragment, {
    children
  });
}
_s6(PerformanceBoundary, "CFUjzDkfCTMC5oYmQikLHxGaKfg=", false, function () {
  return [usePerformance];
});
_c = PerformanceBoundary;
function ResponsiveWrapper({
  children,
  mobile,
  tablet,
  desktop
}) {
  _s7();
  const {
    isMobile,
    isTablet,
    isDesktop
  } = useMobileOptimization();
  if (isMobile && mobile) return /* @__PURE__ */jsx(Fragment, {
    children: mobile
  });
  if (isTablet && tablet) return /* @__PURE__ */jsx(Fragment, {
    children: tablet
  });
  if (isDesktop && desktop) return /* @__PURE__ */jsx(Fragment, {
    children: desktop
  });
  return /* @__PURE__ */jsx(Fragment, {
    children
  });
}
_s7(ResponsiveWrapper, "npcyBS5Uc/oXCAh4x/IfNykvD5M=", false, function () {
  return [useMobileOptimization];
});
_c2 = ResponsiveWrapper;
function MobileOptimized({
  children,
  touchOptimized = true,
  disableHover = true,
  className,
  style
}) {
  _s8();
  const {
    isMobile
  } = useMobileOptimization();
  if (!isMobile) return /* @__PURE__ */jsx(Fragment, {
    children
  });
  const mobileStyles = {
    touchAction: touchOptimized ? "manipulation" : "auto",
    userSelect: "none",
    WebkitTouchCallout: "none",
    ...style
  };
  const mobileClassName = disableHover ? `${className || ""} mobile-optimized`.trim() : className;
  return /* @__PURE__ */jsx("div", {
    className: mobileClassName,
    style: mobileStyles,
    children
  });
}
_s8(MobileOptimized, "ooklZzjpvhZQJjjJPAIh9f79YAM=", false, function () {
  return [useMobileOptimization];
});
_c3 = MobileOptimized;
export { MobileOptimized, PerformanceBoundary, ResponsiveWrapper, formatDamage, formatDamageChange, formatExperience, formatExperienceChange, formatHealing, formatHealthPercentage, getHealthColor, getHealthColorIntensity, getHealthStatus, getMinTouchTargetSize, getTouchTargetSize, isMobileDevice, isTabletDevice, isTouchDevice, useCharacterStats, useGameColors, useGameTheme, useMobileOptimization, usePerformance };
var _c, _c2, _c3;
$RefreshReg$(_c, "PerformanceBoundary");
$RefreshReg$(_c2, "ResponsiveWrapper");
$RefreshReg$(_c3, "MobileOptimized");

if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}


if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/workspaces/chainbrawler_dev/packages/react-ui/dist/index.js", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/workspaces/chainbrawler_dev/packages/react-ui/dist/index.js", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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LEdBQUdDLFNBQUEsSUFBYSxFQUFFLG9CQUFvQlEsSUFBQSxFQUFLLEdBQzNDUixTQUFBO0VBRUosc0JBQ0VaLElBQUM7SUFDQ1ksU0FBQSxFQUFXTyxlQUFBO0lBQ1hOLEtBQUEsRUFBT0UsWUFBQTtJQUVObkI7RUFBQSxFQUNIO0FBRUo7QUFBQWtCLEdBQUEsQ0E5QmdCTCxlQUFBO0VBQUEsUUFPTy9HLHFCQUFBO0FBQUE7QUFBQTJILEdBQUEsR0FQUFosZUFBQSIsIm5hbWVzIjpbInVzZUNoYXJhY3RlclN0YXRzIiwiY2hhcmFjdGVyIiwiX3MiLCJ1c2VNZW1vIiwiZXhpc3RzIiwiY29tYmF0IiwiZGVmZW5zZSIsImx1Y2siLCJ0b3RhbCIsImxldmVsIiwiZXhwZXJpZW5jZSIsImhlYWx0aCIsImN1cnJlbnQiLCJtYXgiLCJwZXJjZW50YWdlIiwiaXNBbGl2ZSIsImluQ29tYmF0Iiwic3RhdHMiLCJoZWFsdGhDdXJyZW50IiwiZW5kdXJhbmNlIiwiaGVhbHRoTWF4IiwiaGVhbHRoUGVyY2VudGFnZSIsInVzZU1vYmlsZU9wdGltaXphdGlvbiIsIl9zMiIsImlzTW9iaWxlIiwic2V0SXNNb2JpbGUiLCJ1c2VTdGF0ZSIsImlzVGFibGV0Iiwic2V0SXNUYWJsZXQiLCJpc0Rlc2t0b3AiLCJzZXRJc0Rlc2t0b3AiLCJvcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwibW9iaWxlUXVlcnkiLCJ1c2VNZWRpYVF1ZXJ5IiwidGFibGV0UXVlcnkiLCJkZXNrdG9wUXVlcnkiLCJ1c2VFZmZlY3QiLCJoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaXNUb3VjaERldmljZSIsIm5hdmlnYXRvciIsIm1heFRvdWNoUG9pbnRzIiwidXNlUGVyZm9ybWFuY2UiLCJfczMiLCJpc0xvd0VuZCIsInNldElzTG93RW5kIiwibWVtb3J5VXNhZ2UiLCJzZXRNZW1vcnlVc2FnZSIsImlzTG93RW5kRGV2aWNlIiwiaGFyZHdhcmVDb25jdXJyZW5jeSIsImRldmljZU1lbW9yeSIsInBlcmZvcm1hbmNlIiwidXBkYXRlTWVtb3J5IiwibWVtb3J5IiwidXNlZEpTSGVhcFNpemUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNob3VsZFJlZHVjZUFuaW1hdGlvbnMiLCJzaG91bGRMYXp5TG9hZCIsInVzZUdhbWVDb2xvcnMiLCJfczQiLCJsaWdodCIsImJhc2UiLCJkYXJrIiwiZ2V0QnlQZXJjZW50YWdlIiwibWFuYSIsInJhcml0eSIsImNvbW1vbiIsInVuY29tbW9uIiwicmFyZSIsImVwaWMiLCJsZWdlbmRhcnkiLCJzdGF0dXMiLCJzdWNjZXNzIiwid2FybmluZyIsImVycm9yIiwiaW5mbyIsInVzZUdhbWVUaGVtZSIsIl9zNSIsImNvbG9ycyIsInNwYWNpbmciLCJ4cyIsInNtIiwibWQiLCJsZyIsInhsIiwiYnJlYWtwb2ludHMiLCJpc01vYmlsZURldmljZSIsInRlc3QiLCJ1c2VyQWdlbnQiLCJpc1RhYmxldERldmljZSIsImdldFRvdWNoVGFyZ2V0U2l6ZSIsInNpemUiLCJzaXplcyIsImdldE1pblRvdWNoVGFyZ2V0U2l6ZSIsImZvcm1hdEhlYWx0aFBlcmNlbnRhZ2UiLCJNYXRoIiwicm91bmQiLCJnZXRIZWFsdGhTdGF0dXMiLCJmb3JtYXRFeHBlcmllbmNlIiwidG9GaXhlZCIsInRvU3RyaW5nIiwiZm9ybWF0RXhwZXJpZW5jZUNoYW5nZSIsImNoYW5nZSIsInNpZ24iLCJhYnMiLCJmb3JtYXREYW1hZ2UiLCJkYW1hZ2UiLCJmb3JtYXREYW1hZ2VDaGFuZ2UiLCJmb3JtYXRIZWFsaW5nIiwiaGVhbGluZyIsImdldEhlYWx0aENvbG9yIiwiZ2V0SGVhbHRoQ29sb3JJbnRlbnNpdHkiLCJQZXJmb3JtYW5jZUJvdW5kYXJ5IiwiY2hpbGRyZW4iLCJmYWxsYmFjayIsImVuYWJsZVBlcmZvcm1hbmNlTW9kZSIsIl9zNiIsImpzeCIsIkZyYWdtZW50IiwiX2MiLCJSZXNwb25zaXZlV3JhcHBlciIsIm1vYmlsZSIsInRhYmxldCIsImRlc2t0b3AiLCJfczciLCJfYzIiLCJNb2JpbGVPcHRpbWl6ZWQiLCJ0b3VjaE9wdGltaXplZCIsImRpc2FibGVIb3ZlciIsImNsYXNzTmFtZSIsInN0eWxlIiwiX3M4IiwibW9iaWxlU3R5bGVzIiwidG91Y2hBY3Rpb24iLCJ1c2VyU2VsZWN0IiwiV2Via2l0VG91Y2hDYWxsb3V0IiwibW9iaWxlQ2xhc3NOYW1lIiwidHJpbSIsIl9jMyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyIuLi9zcmMvaG9va3MvdXNlQ2hhcmFjdGVyU3RhdHMudHMiLCIuLi9zcmMvaG9va3MvdXNlTW9iaWxlT3B0aW1pemF0aW9uLnRzIiwiLi4vc3JjL2hvb2tzL3VzZVBlcmZvcm1hbmNlLnRzIiwiLi4vc3JjL2hvb2tzL3VzZUdhbWVDb2xvcnMudHMiLCIuLi9zcmMvaG9va3MvdXNlR2FtZVRoZW1lLnRzIiwiLi4vc3JjL3V0aWxzL21vYmlsZS50cyIsIi4uL3NyYy91dGlscy9mb3JtYXR0aW5nLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvUGVyZm9ybWFuY2VCb3VuZGFyeS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9SZXNwb25zaXZlV3JhcHBlci50c3giLCIuLi9zcmMvY29tcG9uZW50cy9Nb2JpbGVPcHRpbWl6ZWQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyNSBDaGFpbkJyYXdsZXIgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2hhcmFjdGVyRGF0YSB9IGZyb20gJ0BjaGFpbmJyYXdsZXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyU3RhdHMge1xuICBjb21iYXQ6IG51bWJlcjtcbiAgZGVmZW5zZTogbnVtYmVyO1xuICBsdWNrOiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG4gIGxldmVsOiBudW1iZXI7XG4gIGV4cGVyaWVuY2U6IG51bWJlcjtcbiAgaGVhbHRoOiB7XG4gICAgY3VycmVudDogbnVtYmVyO1xuICAgIG1heDogbnVtYmVyO1xuICAgIHBlcmNlbnRhZ2U6IG51bWJlcjtcbiAgfTtcbiAgaXNBbGl2ZTogYm9vbGVhbjtcbiAgaW5Db21iYXQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VDaGFyYWN0ZXJTdGF0cyhjaGFyYWN0ZXI6IENoYXJhY3RlckRhdGEgfCBudWxsKTogQ2hhcmFjdGVyU3RhdHMge1xuICByZXR1cm4gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFjaGFyYWN0ZXI/LmV4aXN0cykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tYmF0OiAwLFxuICAgICAgICBkZWZlbnNlOiAwLFxuICAgICAgICBsdWNrOiAwLFxuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIGV4cGVyaWVuY2U6IDAsXG4gICAgICAgIGhlYWx0aDogeyBjdXJyZW50OiAwLCBtYXg6IDAsIHBlcmNlbnRhZ2U6IDAgfSxcbiAgICAgICAgaXNBbGl2ZTogZmFsc2UsXG4gICAgICAgIGluQ29tYmF0OiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgY29tYmF0ID0gY2hhcmFjdGVyLnN0YXRzPy5jb21iYXQgfHwgMDtcbiAgICBjb25zdCBkZWZlbnNlID0gY2hhcmFjdGVyLnN0YXRzPy5kZWZlbnNlIHx8IDA7XG4gICAgY29uc3QgbHVjayA9IGNoYXJhY3Rlci5zdGF0cz8ubHVjayB8fCAwO1xuICAgIGNvbnN0IHRvdGFsID0gY29tYmF0ICsgZGVmZW5zZSArIGx1Y2s7XG4gICAgXG4gICAgY29uc3QgaGVhbHRoQ3VycmVudCA9IGNoYXJhY3Rlci5lbmR1cmFuY2U/LmN1cnJlbnQgfHwgMDtcbiAgICBjb25zdCBoZWFsdGhNYXggPSBjaGFyYWN0ZXIuZW5kdXJhbmNlPy5tYXggfHwgMDtcbiAgICBjb25zdCBoZWFsdGhQZXJjZW50YWdlID0gaGVhbHRoTWF4ID4gMCA/IChoZWFsdGhDdXJyZW50IC8gaGVhbHRoTWF4KSAqIDEwMCA6IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29tYmF0LFxuICAgICAgZGVmZW5zZSxcbiAgICAgIGx1Y2ssXG4gICAgICB0b3RhbCxcbiAgICAgIGxldmVsOiBjaGFyYWN0ZXIubGV2ZWwgfHwgMCxcbiAgICAgIGV4cGVyaWVuY2U6IGNoYXJhY3Rlci5leHBlcmllbmNlIHx8IDAsXG4gICAgICBoZWFsdGg6IHtcbiAgICAgICAgY3VycmVudDogaGVhbHRoQ3VycmVudCxcbiAgICAgICAgbWF4OiBoZWFsdGhNYXgsXG4gICAgICAgIHBlcmNlbnRhZ2U6IGhlYWx0aFBlcmNlbnRhZ2UsXG4gICAgICB9LFxuICAgICAgaXNBbGl2ZTogY2hhcmFjdGVyLmlzQWxpdmUsXG4gICAgICBpbkNvbWJhdDogY2hhcmFjdGVyLmluQ29tYmF0LFxuICAgIH07XG4gIH0sIFtjaGFyYWN0ZXJdKTtcbn1cbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAyNSBDaGFpbkJyYXdsZXIgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTWVkaWFRdWVyeSB9IGZyb20gJ0BtYW50aW5lL2hvb2tzJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2JpbGVPcHRpbWl6YXRpb24ge1xuICBpc01vYmlsZTogYm9vbGVhbjtcbiAgaXNUYWJsZXQ6IGJvb2xlYW47XG4gIGlzRGVza3RvcDogYm9vbGVhbjtcbiAgb3JpZW50YXRpb246ICdwb3J0cmFpdCcgfCAnbGFuZHNjYXBlJztcbiAgaXNUb3VjaERldmljZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1vYmlsZU9wdGltaXphdGlvbigpOiBNb2JpbGVPcHRpbWl6YXRpb24ge1xuICBjb25zdCBbaXNNb2JpbGUsIHNldElzTW9iaWxlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzVGFibGV0LCBzZXRJc1RhYmxldF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0Rlc2t0b3AsIHNldElzRGVza3RvcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtvcmllbnRhdGlvbiwgc2V0T3JpZW50YXRpb25dID0gdXNlU3RhdGU8J3BvcnRyYWl0JyB8ICdsYW5kc2NhcGUnPigncG9ydHJhaXQnKTtcblxuICBjb25zdCBtb2JpbGVRdWVyeSA9IHVzZU1lZGlhUXVlcnkoJyhtYXgtd2lkdGg6IDc2OHB4KScpO1xuICBjb25zdCB0YWJsZXRRdWVyeSA9IHVzZU1lZGlhUXVlcnkoJyhtaW4td2lkdGg6IDc2OXB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KScpO1xuICBjb25zdCBkZXNrdG9wUXVlcnkgPSB1c2VNZWRpYVF1ZXJ5KCcobWluLXdpZHRoOiAxMDI1cHgpJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRJc01vYmlsZShtb2JpbGVRdWVyeSB8fCBmYWxzZSk7XG4gICAgc2V0SXNUYWJsZXQodGFibGV0UXVlcnkgfHwgZmFsc2UpO1xuICAgIHNldElzRGVza3RvcChkZXNrdG9wUXVlcnkgfHwgZmFsc2UpO1xuICB9LCBbbW9iaWxlUXVlcnksIHRhYmxldFF1ZXJ5LCBkZXNrdG9wUXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgc2V0T3JpZW50YXRpb24od2luZG93LmlubmVySGVpZ2h0ID4gd2luZG93LmlubmVyV2lkdGggPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZScpO1xuICAgIH07XG5cbiAgICBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlT3JpZW50YXRpb25DaGFuZ2UpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIGhhbmRsZU9yaWVudGF0aW9uQ2hhbmdlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVPcmllbnRhdGlvbkNoYW5nZSk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXNNb2JpbGUsXG4gICAgaXNUYWJsZXQsXG4gICAgaXNEZXNrdG9wLFxuICAgIG9yaWVudGF0aW9uLFxuICAgIGlzVG91Y2hEZXZpY2U6ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwLFxuICB9O1xufVxuIiwiLypcbiAqIENvcHlyaWdodCAyMDI1IENoYWluQnJhd2xlciBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVyZm9ybWFuY2VTdGF0ZSB7XG4gIGlzTG93RW5kOiBib29sZWFuO1xuICBtZW1vcnlVc2FnZTogbnVtYmVyO1xuICBzaG91bGRSZWR1Y2VBbmltYXRpb25zOiBib29sZWFuO1xuICBzaG91bGRMYXp5TG9hZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVBlcmZvcm1hbmNlKCk6IFBlcmZvcm1hbmNlU3RhdGUge1xuICBjb25zdCBbaXNMb3dFbmQsIHNldElzTG93RW5kXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21lbW9yeVVzYWdlLCBzZXRNZW1vcnlVc2FnZV0gPSB1c2VTdGF0ZSgwKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIERldGVjdCBsb3ctZW5kIGRldmljZXNcbiAgICBjb25zdCBpc0xvd0VuZERldmljZSA9IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IDw9IDIgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChuYXZpZ2F0b3IgYXMgYW55KS5kZXZpY2VNZW1vcnkgPD0gNDtcbiAgICBzZXRJc0xvd0VuZChpc0xvd0VuZERldmljZSk7XG5cbiAgICAvLyBNb25pdG9yIG1lbW9yeSB1c2FnZVxuICAgIGlmICgnbWVtb3J5JyBpbiBwZXJmb3JtYW5jZSkge1xuICAgICAgY29uc3QgdXBkYXRlTWVtb3J5ID0gKCkgPT4ge1xuICAgICAgICBzZXRNZW1vcnlVc2FnZSgocGVyZm9ybWFuY2UgYXMgYW55KS5tZW1vcnkudXNlZEpTSGVhcFNpemUpO1xuICAgICAgfTtcbiAgICAgIHVwZGF0ZU1lbW9yeSgpO1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGVNZW1vcnksIDUwMDApO1xuICAgICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgaXNMb3dFbmQsXG4gICAgbWVtb3J5VXNhZ2UsXG4gICAgc2hvdWxkUmVkdWNlQW5pbWF0aW9uczogaXNMb3dFbmQsXG4gICAgc2hvdWxkTGF6eUxvYWQ6IGlzTG93RW5kLFxuICB9O1xufVxuIiwiLypcbiAqIENvcHlyaWdodCAyMDI1IENoYWluQnJhd2xlciBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2FtZUNvbG9ycyB7XG4gIGhlYWx0aDoge1xuICAgIGxpZ2h0OiBzdHJpbmc7XG4gICAgYmFzZTogc3RyaW5nO1xuICAgIGRhcms6IHN0cmluZztcbiAgICBnZXRCeVBlcmNlbnRhZ2U6IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHN0cmluZztcbiAgfTtcbiAgbWFuYToge1xuICAgIGxpZ2h0OiBzdHJpbmc7XG4gICAgYmFzZTogc3RyaW5nO1xuICAgIGRhcms6IHN0cmluZztcbiAgfTtcbiAgZXhwZXJpZW5jZToge1xuICAgIGxpZ2h0OiBzdHJpbmc7XG4gICAgYmFzZTogc3RyaW5nO1xuICAgIGRhcms6IHN0cmluZztcbiAgfTtcbiAgY29tYmF0OiB7XG4gICAgbGlnaHQ6IHN0cmluZztcbiAgICBiYXNlOiBzdHJpbmc7XG4gICAgZGFyazogc3RyaW5nO1xuICB9O1xuICBkZWZlbnNlOiB7XG4gICAgbGlnaHQ6IHN0cmluZztcbiAgICBiYXNlOiBzdHJpbmc7XG4gICAgZGFyazogc3RyaW5nO1xuICB9O1xuICBsdWNrOiB7XG4gICAgbGlnaHQ6IHN0cmluZztcbiAgICBiYXNlOiBzdHJpbmc7XG4gICAgZGFyazogc3RyaW5nO1xuICB9O1xuICByYXJpdHk6IHtcbiAgICBjb21tb246IHN0cmluZztcbiAgICB1bmNvbW1vbjogc3RyaW5nO1xuICAgIHJhcmU6IHN0cmluZztcbiAgICBlcGljOiBzdHJpbmc7XG4gICAgbGVnZW5kYXJ5OiBzdHJpbmc7XG4gIH07XG4gIHN0YXR1czoge1xuICAgIHN1Y2Nlc3M6IHN0cmluZztcbiAgICB3YXJuaW5nOiBzdHJpbmc7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBpbmZvOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VHYW1lQ29sb3JzKCk6IEdhbWVDb2xvcnMge1xuICByZXR1cm4gdXNlTWVtbygoKSA9PiAoe1xuICAgIGhlYWx0aDoge1xuICAgICAgbGlnaHQ6ICcjZjBmOWYwJyxcbiAgICAgIGJhc2U6ICcjMjJjNTVlJyxcbiAgICAgIGRhcms6ICcjMTU4MDNkJyxcbiAgICAgIGdldEJ5UGVyY2VudGFnZTogKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAocGVyY2VudGFnZSA+PSA3MCkgcmV0dXJuICcjMjJjNTVlJzsgLy8gR3JlZW5cbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPj0gMzApIHJldHVybiAnI2Y1OWUwYic7IC8vIE9yYW5nZVxuICAgICAgICBpZiAocGVyY2VudGFnZSA+IDApIHJldHVybiAnI2VmNDQ0NCc7ICAgLy8gUmVkXG4gICAgICAgIHJldHVybiAnIzZiNzI4MCc7IC8vIEdyYXlcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtYW5hOiB7XG4gICAgICBsaWdodDogJyNmMGY5ZmYnLFxuICAgICAgYmFzZTogJyMwZWE1ZTknLFxuICAgICAgZGFyazogJyMwYzRhNmUnLFxuICAgIH0sXG4gICAgZXhwZXJpZW5jZToge1xuICAgICAgbGlnaHQ6ICcjZmZmYmViJyxcbiAgICAgIGJhc2U6ICcjZjU5ZTBiJyxcbiAgICAgIGRhcms6ICcjNzgzNTBmJyxcbiAgICB9LFxuICAgIGNvbWJhdDoge1xuICAgICAgbGlnaHQ6ICcjZmVmMmYyJyxcbiAgICAgIGJhc2U6ICcjZWY0NDQ0JyxcbiAgICAgIGRhcms6ICcjN2YxZDFkJyxcbiAgICB9LFxuICAgIGRlZmVuc2U6IHtcbiAgICAgIGxpZ2h0OiAnI2VmZjZmZicsXG4gICAgICBiYXNlOiAnIzNiODJmNicsXG4gICAgICBkYXJrOiAnIzFlM2E4YScsXG4gICAgfSxcbiAgICBsdWNrOiB7XG4gICAgICBsaWdodDogJyNmYWY1ZmYnLFxuICAgICAgYmFzZTogJyNhODU1ZjcnLFxuICAgICAgZGFyazogJyM1ODFjODcnLFxuICAgIH0sXG4gICAgcmFyaXR5OiB7XG4gICAgICBjb21tb246ICcjOWNhM2FmJywgICAgLy8gR3JheVxuICAgICAgdW5jb21tb246ICcjMjJjNTVlJywgIC8vIEdyZWVuXG4gICAgICByYXJlOiAnIzNiODJmNicsICAgICAgLy8gQmx1ZVxuICAgICAgZXBpYzogJyNhODU1ZjcnLCAgICAgIC8vIFB1cnBsZVxuICAgICAgbGVnZW5kYXJ5OiAnI2Y1OWUwYicsIC8vIE9yYW5nZVxuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICBzdWNjZXNzOiAnIzIyYzU1ZScsICAgLy8gR3JlZW5cbiAgICAgIHdhcm5pbmc6ICcjZjU5ZTBiJywgICAvLyBPcmFuZ2VcbiAgICAgIGVycm9yOiAnI2VmNDQ0NCcsICAgICAvLyBSZWRcbiAgICAgIGluZm86ICcjM2I4MmY2JywgICAgICAvLyBCbHVlXG4gICAgfSxcbiAgfSksIFtdKTtcbn1cbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAyNSBDaGFpbkJyYXdsZXIgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdhbWVUaGVtZSB7XG4gIGNvbG9yczoge1xuICAgIGhlYWx0aDogc3RyaW5nO1xuICAgIG1hbmE6IHN0cmluZztcbiAgICBleHBlcmllbmNlOiBzdHJpbmc7XG4gICAgY29tYmF0OiBzdHJpbmc7XG4gICAgZGVmZW5zZTogc3RyaW5nO1xuICAgIGx1Y2s6IHN0cmluZztcbiAgfTtcbiAgc3BhY2luZzoge1xuICAgIHhzOiBudW1iZXI7XG4gICAgc206IG51bWJlcjtcbiAgICBtZDogbnVtYmVyO1xuICAgIGxnOiBudW1iZXI7XG4gICAgeGw6IG51bWJlcjtcbiAgfTtcbiAgYnJlYWtwb2ludHM6IHtcbiAgICB4czogc3RyaW5nO1xuICAgIHNtOiBzdHJpbmc7XG4gICAgbWQ6IHN0cmluZztcbiAgICBsZzogc3RyaW5nO1xuICAgIHhsOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VHYW1lVGhlbWUoKTogR2FtZVRoZW1lIHtcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4gKHtcbiAgICBjb2xvcnM6IHtcbiAgICAgIGhlYWx0aDogJyMyMmM1NWUnLFxuICAgICAgbWFuYTogJyMwZWE1ZTknLFxuICAgICAgZXhwZXJpZW5jZTogJyNmNTllMGInLFxuICAgICAgY29tYmF0OiAnI2VmNDQ0NCcsXG4gICAgICBkZWZlbnNlOiAnIzNiODJmNicsXG4gICAgICBsdWNrOiAnI2E4NTVmNycsXG4gICAgfSxcbiAgICBzcGFjaW5nOiB7XG4gICAgICB4czogNCxcbiAgICAgIHNtOiA4LFxuICAgICAgbWQ6IDE2LFxuICAgICAgbGc6IDI0LFxuICAgICAgeGw6IDMyLFxuICAgIH0sXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIHhzOiAnMHB4JyxcbiAgICAgIHNtOiAnNTc2cHgnLFxuICAgICAgbWQ6ICc3NjhweCcsXG4gICAgICBsZzogJzEwMjRweCcsXG4gICAgICB4bDogJzEyMDBweCcsXG4gICAgfSxcbiAgfSksIFtdKTtcbn1cbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAyNSBDaGFpbkJyYXdsZXIgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KFxuICAgIG5hdmlnYXRvci51c2VyQWdlbnRcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGFibGV0RGV2aWNlKCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIC9pUGFkfEFuZHJvaWQoPz0uKlxcYk1vYmlsZVxcYikvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb3VjaERldmljZSgpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdWNoVGFyZ2V0U2l6ZShzaXplOiAneHMnIHwgJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJyA9ICdtZCcpOiBudW1iZXIge1xuICBjb25zdCBzaXplcyA9IHtcbiAgICB4czogMzIsICAvLyBNaW5pbXVtIGZvciB2ZXJ5IHNtYWxsIGVsZW1lbnRzXG4gICAgc206IDQwLCAgLy8gU21hbGwgYnV0dG9uc1xuICAgIG1kOiA0NCwgIC8vIFN0YW5kYXJkIG1vYmlsZSB0b3VjaCB0YXJnZXQgKGlPUy9BbmRyb2lkKVxuICAgIGxnOiA0OCwgIC8vIExhcmdlIGJ1dHRvbnNcbiAgICB4bDogNTYsICAvLyBFeHRyYSBsYXJnZSBidXR0b25zXG4gIH07XG4gIHJldHVybiBzaXplc1tzaXplXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pblRvdWNoVGFyZ2V0U2l6ZSgpOiBudW1iZXIge1xuICByZXR1cm4gNDQ7IC8vIGlPUy9BbmRyb2lkIG1pbmltdW1cbn1cbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAyNSBDaGFpbkJyYXdsZXIgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0SGVhbHRoUGVyY2VudGFnZShjdXJyZW50OiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIG1heCA+IDAgPyBNYXRoLnJvdW5kKChjdXJyZW50IC8gbWF4KSAqIDEwMCkgOiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SGVhbHRoU3RhdHVzKHBlcmNlbnRhZ2U6IG51bWJlcik6ICdoZWFsdGh5JyB8ICd3YXJuaW5nJyB8ICdjcml0aWNhbCcgfCAnZGVhZCcge1xuICBpZiAocGVyY2VudGFnZSA+PSA3MCkgcmV0dXJuICdoZWFsdGh5JztcbiAgaWYgKHBlcmNlbnRhZ2UgPj0gMzApIHJldHVybiAnd2FybmluZyc7XG4gIGlmIChwZXJjZW50YWdlID4gMCkgcmV0dXJuICdjcml0aWNhbCc7XG4gIHJldHVybiAnZGVhZCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFeHBlcmllbmNlKGV4cGVyaWVuY2U6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChleHBlcmllbmNlID49IDEwMDAwMDApIHtcbiAgICByZXR1cm4gYCR7KGV4cGVyaWVuY2UgLyAxMDAwMDAwKS50b0ZpeGVkKDEpfU1gO1xuICB9XG4gIGlmIChleHBlcmllbmNlID49IDEwMDApIHtcbiAgICByZXR1cm4gYCR7KGV4cGVyaWVuY2UgLyAxMDAwKS50b0ZpeGVkKDEpfUtgO1xuICB9XG4gIHJldHVybiBleHBlcmllbmNlLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFeHBlcmllbmNlQ2hhbmdlKGNoYW5nZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3Qgc2lnbiA9IGNoYW5nZSA+PSAwID8gJysnIDogJyc7XG4gIHJldHVybiBgJHtzaWdufSR7Zm9ybWF0RXhwZXJpZW5jZShNYXRoLmFicyhjaGFuZ2UpKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGFtYWdlKGRhbWFnZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRhbWFnZS50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGFtYWdlQ2hhbmdlKGRhbWFnZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAtJHtmb3JtYXREYW1hZ2UoZGFtYWdlKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0SGVhbGluZyhoZWFsaW5nOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYCske2hlYWxpbmd9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhlYWx0aENvbG9yKHBlcmNlbnRhZ2U6IG51bWJlcik6IHN0cmluZyB7XG4gIGlmIChwZXJjZW50YWdlID49IDcwKSByZXR1cm4gJ2dyZWVuJztcbiAgaWYgKHBlcmNlbnRhZ2UgPj0gMzApIHJldHVybiAneWVsbG93JztcbiAgaWYgKHBlcmNlbnRhZ2UgPiAwKSByZXR1cm4gJ3JlZCc7XG4gIHJldHVybiAnZ3JheSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFsdGhDb2xvckludGVuc2l0eShwZXJjZW50YWdlOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAocGVyY2VudGFnZSA+PSA3MCkgcmV0dXJuIDE7XG4gIGlmIChwZXJjZW50YWdlID49IDMwKSByZXR1cm4gMC43O1xuICBpZiAocGVyY2VudGFnZSA+IDApIHJldHVybiAwLjU7XG4gIHJldHVybiAwLjM7XG59XG4iLCIvKlxuICogQ29weXJpZ2h0IDIwMjUgQ2hhaW5CcmF3bGVyIFRlYW1cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVBlcmZvcm1hbmNlIH0gZnJvbSAnLi4vaG9va3MvdXNlUGVyZm9ybWFuY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcmZvcm1hbmNlQm91bmRhcnlQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGZhbGxiYWNrPzogUmVhY3QuUmVhY3ROb2RlO1xuICBlbmFibGVQZXJmb3JtYW5jZU1vZGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUGVyZm9ybWFuY2VCb3VuZGFyeSh7IFxuICBjaGlsZHJlbiwgXG4gIGZhbGxiYWNrLFxuICBlbmFibGVQZXJmb3JtYW5jZU1vZGUgPSB0cnVlXG59OiBQZXJmb3JtYW5jZUJvdW5kYXJ5UHJvcHMpIHtcbiAgY29uc3QgeyBpc0xvd0VuZCB9ID0gdXNlUGVyZm9ybWFuY2UoKTtcbiAgXG4gIGlmIChlbmFibGVQZXJmb3JtYW5jZU1vZGUgJiYgaXNMb3dFbmQgJiYgZmFsbGJhY2spIHtcbiAgICByZXR1cm4gPD57ZmFsbGJhY2t9PC8+O1xuICB9XG4gIFxuICByZXR1cm4gPD57Y2hpbGRyZW59PC8+O1xufVxuIiwiLypcbiAqIENvcHlyaWdodCAyMDI1IENoYWluQnJhd2xlciBUZWFtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VNb2JpbGVPcHRpbWl6YXRpb24gfSBmcm9tICcuLi9ob29rcy91c2VNb2JpbGVPcHRpbWl6YXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3BvbnNpdmVXcmFwcGVyUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBtb2JpbGU/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHRhYmxldD86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgZGVza3RvcD86IFJlYWN0LlJlYWN0Tm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlc3BvbnNpdmVXcmFwcGVyKHsgXG4gIGNoaWxkcmVuLCBcbiAgbW9iaWxlLCBcbiAgdGFibGV0LCBcbiAgZGVza3RvcCBcbn06IFJlc3BvbnNpdmVXcmFwcGVyUHJvcHMpIHtcbiAgY29uc3QgeyBpc01vYmlsZSwgaXNUYWJsZXQsIGlzRGVza3RvcCB9ID0gdXNlTW9iaWxlT3B0aW1pemF0aW9uKCk7XG4gIFxuICBpZiAoaXNNb2JpbGUgJiYgbW9iaWxlKSByZXR1cm4gPD57bW9iaWxlfTwvPjtcbiAgaWYgKGlzVGFibGV0ICYmIHRhYmxldCkgcmV0dXJuIDw+e3RhYmxldH08Lz47XG4gIGlmIChpc0Rlc2t0b3AgJiYgZGVza3RvcCkgcmV0dXJuIDw+e2Rlc2t0b3B9PC8+O1xuICBcbiAgcmV0dXJuIDw+e2NoaWxkcmVufTwvPjtcbn1cbiIsIi8qXG4gKiBDb3B5cmlnaHQgMjAyNSBDaGFpbkJyYXdsZXIgVGVhbVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlTW9iaWxlT3B0aW1pemF0aW9uIH0gZnJvbSAnLi4vaG9va3MvdXNlTW9iaWxlT3B0aW1pemF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2JpbGVPcHRpbWl6ZWRQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG4gIHRvdWNoT3B0aW1pemVkPzogYm9vbGVhbjtcbiAgZGlzYWJsZUhvdmVyPzogYm9vbGVhbjtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb2JpbGVPcHRpbWl6ZWQoeyBcbiAgY2hpbGRyZW4sIFxuICB0b3VjaE9wdGltaXplZCA9IHRydWUsXG4gIGRpc2FibGVIb3ZlciA9IHRydWUsXG4gIGNsYXNzTmFtZSxcbiAgc3R5bGVcbn06IE1vYmlsZU9wdGltaXplZFByb3BzKSB7XG4gIGNvbnN0IHsgaXNNb2JpbGUgfSA9IHVzZU1vYmlsZU9wdGltaXphdGlvbigpO1xuICBcbiAgaWYgKCFpc01vYmlsZSkgcmV0dXJuIDw+e2NoaWxkcmVufTwvPjtcbiAgXG4gIGNvbnN0IG1vYmlsZVN0eWxlczogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgICB0b3VjaEFjdGlvbjogdG91Y2hPcHRpbWl6ZWQgPyAnbWFuaXB1bGF0aW9uJyA6ICdhdXRvJyxcbiAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgV2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG4gICAgLi4uc3R5bGUsXG4gIH07XG5cbiAgY29uc3QgbW9iaWxlQ2xhc3NOYW1lID0gZGlzYWJsZUhvdmVyIFxuICAgID8gYCR7Y2xhc3NOYW1lIHx8ICcnfSBtb2JpbGUtb3B0aW1pemVkYC50cmltKClcbiAgICA6IGNsYXNzTmFtZTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17bW9iaWxlQ2xhc3NOYW1lfVxuICAgICAgc3R5bGU9e21vYmlsZVN0eWxlc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwiZmlsZSI6Ii93b3Jrc3BhY2VzL2NoYWluYnJhd2xlcl9kZXYvcGFja2FnZXMvcmVhY3QtdWkvZGlzdC9pbmRleC5qcyJ9
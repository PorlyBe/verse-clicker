import type { IOptions, RecursivePartial } from "tsparticles-engine";

import amongus from "../../../assets/cyan_amongus.png";

export const polygonConfig: RecursivePartial<IOptions> = {
  style: {
    position: "absolute",
  },
  fpsLimit: 120,
  background: {
    color: "transparent",
  },
  particles: {
    groups: {
      z5000: {
        number: {
          value: 70,
        },
        zIndex: {
          value: 50,
        },
      },
      z7500: {
        number: {
          value: 30,
        },
        zIndex: {
          value: 75,
        },
      },
      z2500: {
        number: {
          value: 50,
        },
        zIndex: {
          value: 25,
        },
      },
      z1000: {
        number: {
          value: 40,
        },
        zIndex: {
          value: 10,
        },
      },
    },
    number: {
      value: 200,
    },
    color: {
      value: "#fff",
      animation: {
        enable: false,
        speed: 20,
        sync: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 3,
    },
    move: {
      angle: {
        value: 10,
        offset: 0,
      },
      enable: true,
      speed: 5,
      direction: "right",
    },
    zIndex: {
      value: 5,
      opacityRate: 0.5,
    },
  },
  emitters: {
    position: {
      y: 88,
      x: -5,
    },
    life: {
      wait: true,
    },
    rate: {
      delay: 45,
      quantity: 1,
    },
    size: {
      width: 0,
      height: 0,
    },
    particles: {
      shape: {
        type: "images",
        options: {
          images: {
            src: amongus,
            width: 500,
            height: 634,
          },
        },
      },
      size: {
        value: 20,
      },
      move: {
        speed: 10,
        outModes: {
          default: "none",
          right: "destroy",
        },
        straight: true,
      },
      zIndex: {
        value: 0,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 10,
          sync: true,
        },
      },
    },
  },
  detectRetina: true,
} as const;

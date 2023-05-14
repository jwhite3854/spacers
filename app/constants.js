const CONSTANTS = {
    PATH: {
        REGISTER: "register",
        MY_AGENT: "my/agent",
        FACTIONS: "factions",
        CONTRACTS: "my/contracts",
        SYSTEMS: "systems",
        WAYPOINTS: "waypoints",
        SHIPS: "my/ships",
    },
    CONTRACTS: {
        ACCEPT: "accept",
        DELIVER: "deliver",
        FULFILL: "fulfill"
    },
    WAYPOINTS: {
        MARKET: "market",
        SHIPYARD: "shipyard",
        JUMP_GATE: "jump-gate"
    },

    SHIPS: {
        TYPE: {
            SHIP_PROBE: "SHIP_PROBE",
            SHIP_MINING_DRONE: "SHIP_MINING_DRONE",
            SHIP_INTERCEPTOR: "SHIP_INTERCEPTOR",
            SHIP_LIGHT_HAULER: "SHIP_LIGHT_HAULER",
            SHIP_COMMAND_FRIGATE: "SHIP_COMMAND_FRIGATE",
            SHIP_EXPLORER: "SHIP_EXPLORER",
            SHIP_HEAVY_FREIGHTER: "SHIP_HEAVY_FREIGHTER",
            SHIP_LIGHT_SHUTTLE: "SHIP_LIGHT_SHUTTLE",
            SHIP_ORE_HOUND: "SHIP_ORE_HOUND",
            SHIP_REFINING_FREIGHTER: "SHIP_REFINING_FREIGHTER"
        },
        SYSTEMS: {
            CARGO: "cargo",
            REACTOR: "cooldown",
            NAV: "nav",
        },

        SCAN: {
            SYSTEMS: "scan/systems",
            WAYPOINTS: "scan/waypoints",
            SHIPS: "scan/ships"
        },

        CARGO: {
            PURCHASE: "purchase",
            TRANSFER: "transfer",
            SELL: "sell",
            JETTISON: "jettison",
        },

        ACTIONS: {
            REFINE: "refine",
            CHART: "chart",
            DOCK: "dock",
            SURVEY: "survey",
            EXTRACT: "extract",
            REFUEL: "refuel"
        },

        NAVIGATE: {
            DOCK: "dock",
            ORBIT: "orbit",
            JUMP: "jump",
            NAVIGATE: "navigate",
            WARP: "warp"
        },

        NAV_STATUS: {
            IN_TRANSIT: "In Transit",
            IN_ORBIT: "In Orbit",
            DOCKED: "Docked"
        },

        FLIGHT_MODE: {
            DRIFT: "Drift",
            STEALTH: "Stealth",
            CRUISE: "Cruise",
            BURN: "Burn"
        }
    },

    SYSTEM: {
        TYPE: {
            NEUTRON_STAR: "Neutron Star",
            RED_STAR: "Red Star",
            ORANGE_STAR: "Orange Star",
            BLUE_STAR: "Blue Star",
            YOUNG_STAR: "Young Star",
            WHITE_DWARF: "White Dwarf",
            BLACK_HOLE: "Black Hole",
            HYPERGIANT: "Hypergiant",
            NEBULA: "Nebula",
            UNSTABLE: "Unstable"
        }
    },

    WAYPOINT: {
        TYPE: {
            PLANET: "Planet",
            GAS_GIANT: "Gas Giant",
            MOON: "Moon",
            ORBITAL_STATION: "Orbital Station",
            JUMP_GATE: "Jump Gate",
            ASTEROID_FIELD: "Asteroid Field",
            NEBULA: "Nebula",
            DEBRIS_FIELD: "Debris Field",
            GRAVITY_WELL: "Gravity Well"
        }
    },

    SHIP: {
        TYPE: {
            SHIP_PROBE: "SHIP_PROBE",
            SHIP_MINING_DRONE: "SHIP_MINING_DRONE",
            SHIP_INTERCEPTOR: "SHIP_INTERCEPTOR",
            SHIP_LIGHT_HAULER: "SHIP_LIGHT_HAULER",
            SHIP_COMMAND_FRIGATE: "SHIP_COMMAND_FRIGATE",
            SHIP_EXPLORER: "SHIP_EXPLORER",
            SHIP_HEAVY_FREIGHTER: "SHIP_HEAVY_FREIGHTER",
            SHIP_LIGHT_SHUTTLE: "SHIP_LIGHT_SHUTTLE",
            SHIP_ORE_HOUND: "SHIP_ORE_HOUND",
            SHIP_REFINING_FREIGHTER: "SHIP_REFINING_FREIGHTER"
        },

        ROLE: {
            FABRICATOR: "Fabricator",
            HARVESTOR: "Harvestor",
            HAULER: "Hauler",
            INTERCEPTOR: "Interceptor",
            EXCAVATOR: "Excavator",
            TRANSPORT: "Transport",
            REPAIR: "Repair",
            SURVEYOR: "Surveyor",
            COMMAND: "Command",
            CARRIER: "Carrier",
            PATROL: "Patrol",
            SATELLITE: "Satellite",
            EXPLORER: "Explorer",
            REFINERY: "Refinery"
        },

        SYSTEM: {
            CARGO: "cargo",
            REACTOR: "cooldown",
            NAV: "nav",
        },

        SCAN: {
            SYSTEMS: "scan/systems",
            WAYPOINTS: "scan/waypoints",
            SHIPS: "scan/ships"
        },

        CARGO: {
            LIST: "cargo",
            PURCHASE: "purchase",
            TRANSFER: "transfer",
            SELL: "sell",
            JETTISON: "jettison",
        },

        ACTION: {
            REFINE: "refine",
            CHART: "chart",
            SURVEY: "survey",
            EXTRACT: "extract",
            REFUEL: "refuel"
        },

        NAVIGATE: {
            DOCK: "dock",
            ORBIT: "orbit",
            JUMP: "jump",
            NAVIGATE: "navigate",
            WARP: "warp"
        },

        NAV_STATUS: {
            IN_TRANSIT: "In Transit",
            IN_ORBIT: "In Orbit",
            DOCKED: "Docked"
        },

        FLIGHT_MODE: {
            DRIFT: "Drift",
            STEALTH: "Stealth",
            CRUISE: "Cruise",
            BURN: "Burn"
        }
    },

    RESOURCE: {
        IRON: "Fe",
        COPPER: "Cu",
        SILVER: "Ag",
        GOLD: "Au",
        ALUMINUM: "Al",
        PLATINUM: "Pt",
        URANITE: "U",
        MERITIUM: "M",
        FUEL: "Fuel"
    }

}

export default CONSTANTS;
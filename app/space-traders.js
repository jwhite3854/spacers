import SpaceTradersClient from './client.js';
import SpaceTradersShipCommander from './ship-commander.js';


class SpaceTraders {
    constructor(access_token = null) {
        this.client = new SpaceTradersClient({access_token: access_token});
        this.agent = {};
        this.faction = {};

        this.systems_page = 1;
        this.systems_total = 0;
        this.systems = [];

        this.waypoints_page = 1;
        this.waypoints_total = 0;     
        this.waypoints = [];

        this.contracts_page = 1;
        this.contracts_total = 0;        
        this.contracts = [];

        this.ships_page = 1;
        this.ships_total = 0;
        this.ships = [];

        this.details_type = '';
        this.details_object = {};

        this.command_response = '';
        this.command = function(command, input = {}) {};
    }

    get isSignedIn() {
        return (this.client.access_token !== null);
    }

    async createAgent(faction = null, symbol = null) {
        let data = await this.client.createAgent(faction, symbol);
        this.client.access_token = data.token;
        this.agent = data.agent;
        this.faction = data.faction;
        this.contracts.push(data.contract);
        this.ships.push(data.ship)
    }

    async selectAgent(access_token, validate = true) {
        this.client.setAccessToken(access_token);
        if (!validate) {
            return true;
        }

        return this.client.agent().then((agent) => {
            let validAgent = (agent && agent.hasOwnProperty('data'));
            if (validAgent) {
                this.agent = agent.data;
            } else {
                this.agent = {};
                this.client.setAccessToken(null);
            }

            return validAgent;
        });
    }

    initData(data) {
        this.client.access_token = data.token;
        this.agent = data.agent;
        this.faction = data.faction;
        this.contracts.push(data.contract);
        this.ships.push(data.ship);
    }

    listSystems(page = 1) {
        this.client.systems(null, page).then((systemPage) => {            
            if (systemPage && systemPage.hasOwnProperty('data')) {
                this.systems_total = systemPage.meta.total;
                this.systems_page = page;

                this.systems = [];
                for (let system of systemPage.data) {
                    this.systems.push({
                        symbol: system.symbol,
                        sectorSymbol: system.sectorSymbol,
                        type: system.type,
                        x: system.x,
                        y: system.y,
                        waypoints: system.waypoints.length,
                        factions: system.factions.length
                    });
                }
            }
        });
    }

    listWaypoints(systemSymbol, page = 1) {
        this.client.waypoints(systemSymbol, null, null, page).then((waypointPage) => {
            if (waypointPage && waypointPage.hasOwnProperty('data')) {
                this.waypoints_total = waypointPage.meta.total;
                this.waypoints_page = page;

                this.waypoints = [];
                for (let waypoint of waypointPage.data) {
                    let faction = '';
                    if (waypoint.hasOwnProperty('faction')) {
                        faction = waypoint.faction.symbol;
                    }

                    let facility_function, facility_type = '';
                    let traits = waypoint.traits.map(trait => trait.name);

                    if (waypoint.type === 'JUMP_GATE') {
                        facility_type = SpaceTradersClient.waypointTypes.JUMP_GATE;
                        facility_function = () => {
                            this.client.waypoints(waypoint.systemSymbol, waypoint.symbol, facility_type).then((waypoint) => {
                                this.details_object = waypoint.data;
                            });
                        }
                    } else {
                        for (let trait of waypoint.traits) {
                            if (SpaceTradersClient.waypointTypes.hasOwnProperty(trait.symbol)) {
                                facility_type = SpaceTradersClient.waypointTypes[trait.symbol];
                                facility_function = () => {
                                    this.details_type = 'Waypoint';
                                    this.client.waypoints(waypoint.systemSymbol, waypoint.symbol, facility_type).then((waypoint) => {
                                        this.details_object = waypoint.data;
                                    });
                                }
                                break;
                            }
                        }
                    }
                    
                    this.waypoints.push({
                        system: waypoint.systemSymbol,
                        symbol: waypoint.symbol,
                        type: waypoint.type,
                        x: waypoint.x,
                        y: waypoint.y,
                        traits: traits,
                        faction: faction,
                        facility_type: facility_type,
                        facility_function: facility_function
                    });
                }
            }
        });
    }

    listContracts(page = 1) {
        this.client.contracts('', null, page).then((contractPage) => {
            if (contractPage && contractPage.hasOwnProperty('data')) {
                this.contracts_total = contractPage.meta.total;
                this.contracts_page = page;

                this.contracts = [];
                for (let contract of contractPage.data) {
                    let status = (contract.accepted ? 'Accepted' : 'Pending');
                    status = (contract.fulfilled ? 'Fulfilled' : status);
                    this.contracts.push({
                        id: contract.id,
                        name: contract.type + '_' + contract.id.substring(0, 4),
                        status: status,
                        deadline: contract.terms.deadline,
                        accepted_payment: contract.terms.payment.onAccepted,
                        fulfilled_payment: contract.terms.payment.onFulfilled
                    });
                }
            }
        });
    }

    listShips(page = 1) {
        this.client.ships(null, page).then((shipPage) => {
            if (shipPage && shipPage.hasOwnProperty('data')) {
                this.ships_total = shipPage.meta.total;
                this.ships_page = page;

                this.ships = [];
                for (let ship of shipPage.data) {
                    this.ships.push({
                        name: ship.registration.name,
                        status: ship.nav.status,
                        system: ship.nav.systemSymbol,
                        waypoint: ship.nav.waypointSymbol,
                        frame: ship.frame.name,
                        engine: ship.engine.name,
                        reactor: ship.reactor.name,
                        crew: ship.crew.current,
                        cargo: ship.cargo.units,
                        cargo_max: ship.cargo.capacity
                    });
                }
            }
        });
    }

    getWaypointDetails(systemSymbol, symbol) {
        this.details_type = 'Waypoint';
        this.client.waypoints(systemSymbol, symbol).then((waypoint) => {
            this.details_object = waypoint.data;
        });
    }

    getContractDetails(id) {
        this.details_type = 'Contract';
        this.client.contracts('', id).then((contract) => {
            this.details_object = contract.data;
        });
    }

    getShipDetails(symbol) {
        this.details_type = 'Ship';
        this.client.ships(symbol).then((ship) => {
            this.details_object = ship.data;
            this.command = async (command, input = {}) => {
                let commander = SpaceTradersShipCommander(symbol);
                commander.ship = ship.data;
                commander.client = this.client;
                this.command_response = await commander[command](input);
            }
        });
    }
}

export default SpaceTraders = new SpaceTraders();
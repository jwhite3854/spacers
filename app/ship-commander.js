import CONSTANTS from './constants.js';
import SpaceTradersClient from './client.js';

export default class SpaceTradersShipCommander {
    constructor(ship_symbol = null) {
        this.client = new SpaceTradersClient({access_token: null});
        this.ship_symbol = ship_symbol;
        this.ship = {};
    }

    async dock() {
        if (this.ship.nav.status === CONSTANTS.SHIP.NAV.STATUS.DOCKED) {
            return true;
        }

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.NAVIGATE.DOCK);
    }

    async orbit() {
        if (this.ship.nav.status === CONSTANTS.SHIP.NAV.STATUS.IN_ORBIT) {
            return true;
        }

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.NAVIGATE.ORBIT);
    }

    async navigate(waypointSymbol) {
        if (this.ship.nav.status !== CONSTANTS.SHIPS.NAV_STATUS.IN_ORBIT) {
            return false;
        }

        this.client.body_data = {waypointSymbol}

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.NAVIGATE.NAVIGATE);
    }

    async setFlightMode(flightMode) {
        if (this.ship.nav.status !== CONSTANTS.SHIP.NAV.STATUS.IN_TRANSIT) {
            return false;
        }

        if (!CONSTANTS.SHIP.FLIGHT_MODE.hasOwnProperty(flightMode)) {
            return false;
        }

        this.client.body_data = {flightMode}

        return await this.client.patchShip(this.ship_symbol, CONSTANTS.SHIP.NAVIGATE.NAVIGATE);
    }

    async warp(waypointSymbol) {
        if (this.ship.nav.status !== CONSTANTS.SHIPS.NAV_STATUS.IN_ORBIT) {
            return false;
        }

        this.client.body_data = {waypointSymbol}

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.NAVIGATE.WARP);
    }

    async jump(systemSymbol) {
        if (this.ship.nav.status !== CONSTANTS.SHIPS.NAV_STATUS.IN_ORBIT) {
            return false;
        }

        this.client.body_data = {systemSymbol}

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.NAVIGATE.JUMP);
    }

    async refuel() {
        if (this.ship.nav.status !== CONSTANTS.SHIPS.NAV_STATUS.DOCKED) {
            return false;
        }

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.ACTION.REFUEL);
    }

    async scanSystem() {
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.SCAN.SYSTEMS);
    }

    async scanWaypoint() {
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.SCAN.WAYPOINTS);
    }

    async scanShip() {
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.SCAN.SHIPS);
    }

    async createChart() {
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.ACTION.CHART);
    }

    async createSurvey() {
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.ACTION.SURVEY);
    }

    async listCargo() {
        return await this.client.queryShip(this.ship_symbol, CONSTANTS.SHIP.CARGO.LIST);
    }

    async sellCargo(symbol, units) {
        this.client.body_data = {symbol, units}

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.CARGO.SELL);
    }

    async buyCargo(symbol, units) {
        this.client.body_data = {symbol, units}

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.CARGO.PURCHASE);
    }

    async transferCargo(tradeSymbol, units, shipSymbol) {
        this.client.body_data = {tradeSymbol, units, shipSymbol}


        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.CARGO.TRANSFER);
    }

    async jettisonCargo(symbol, units) {
        this.client.body_data = {symbol, units}

        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.CARGO.JETTISON);
    }

    async extract(survey) {
        this.client.body_data = {survey}
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.ACTION.EXTRACT);
    }

    async refine(resource) {
        if (!CONSTANTS.RESOURCE.hasOwnProperty(resource)) {
            return false;
        }

        this.client.body_data = {
            produce: resource
        }
        return await this.client.commandShip(this.ship_symbol, CONSTANTS.SHIP.ACTION.REFINE);
    }

    async cooldown() {
        return await this.client.queryShip(this.ship_symbol, CONSTANTS.SHIP.SYSTEM.REACTOR);
    }
}

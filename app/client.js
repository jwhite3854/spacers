import CONSTANTS from './constants.js';

export default class SpaceTradersClient {
    constructor(configs) {
        this.base_uri = 'https://api.spacetraders.io/v2/';
        this.access_token = configs.access_token;
        this.in_process = false;
        this.body_data = null;
    }

    static contractTypes = [
        CONSTANTS.CONTRACTS.ACCEPT,
        CONSTANTS.CONTRACTS.DELIVER,
        CONSTANTS.CONTRACTS.FULFILL,
    ];

    static waypointTypes = {
        MARKETPLACE: CONSTANTS.WAYPOINTS.MARKET,
        SHIPYARD: CONSTANTS.WAYPOINTS.SHIPYARD,
        JUMP_GATE:  CONSTANTS.WAYPOINTS.JUMP_GATE
    }

    setAccessToken(access_token) {
        this.access_token = access_token;
    }

    async createAgent(faction = null, symbol = null) {
        if (faction === null || symbol === null) {
            return false;
        }

        return this._request("POST", CONSTANTS.PATH.REGISTER, {faction, symbol});
    }

    async agent() {
        return this._request("GET", CONSTANTS.PATH.MY_AGENT);
    }

    async factions(symbol = null) {
        let path = CONSTANTS.PATH.FACTIONS;
        if (symbol !== null) {
            path += "/" + symbol;
        }
        return this._request("GET", path);
    }

    async contracts(action = '', contractId = null, page = 1) {
        if (action === '' && contractId === null) {
            return this._request("GET", CONSTANTS.PATH.CONTRACTS + "?limit=20&page=" + page);
        } else if (action === '') {
            return this._request("GET", CONSTANTS.PATH.CONTRACTS + "/" + contractId);
        } else if (!SpaceTradersClient.contractTypes.includes(action)) {
            return false;
        }

        let path = "my/contracts/" + contractId + "/" + action;
        let data = {};
        if (action === "DELIVER") {
            data = {

            }
        }

        return this._request("POST", path, data);
    }

    async deliverContract(contractId, data = {}) {

    }

    async systems(systemSymbol = null, page = 1) {
        let path = CONSTANTS.PATH.SYSTEMS;
        if (systemSymbol !== null) {
            path += "/" + systemSymbol;
        } else {
            path += "?limit=20&page=" + page;
        }

        return this._request("GET", path);
    }

    async waypoints(systemSymbol, waypointSymbol = null, type = '', page = 1) {
        let path = CONSTANTS.PATH.SYSTEMS + "/" + systemSymbol + "/" + CONSTANTS.PATH.WAYPOINTS;
        if (waypointSymbol !== null) {
            path += "/" + waypointSymbol;
        } else {
            path += "?limit=20&page=" + page;
        }

        if (Object.values(SpaceTradersClient.waypointTypes).includes(type)) {
            path += "/" + type;
        }

        return this._request("GET", path);
    }

    async ships(shipSymbol = null, page = 1) {
        let path = CONSTANTS.PATH.SHIPS;
        if (shipSymbol !== null) {
            path += "/" + shipSymbol;
        } else {
            path += "?limit=20&page=" + page;
        }
        
        return this._request("GET", path);
    }

    async commandShip(shipSymbol, action) {
        let path = CONSTANTS.PATH.SHIPS + "/" + shipSymbol;
        
        return await this._request("POST", path + "/" + action);
    }

    async patchShip(shipSymbol, action) {
        let path = CONSTANTS.PATH.SHIPS + "/" + shipSymbol;
        
        return await this._request("PUT", path + "/" + action);
    }

    async queryShip(shipSymbol, action) {
        let path = CONSTANTS.PATH.SHIPS + "/" + shipSymbol;
        
        return await this._request("GET", path + "/" + action);
    }

    async _request(method, path) {
        if (this.in_process) {
            return false;
        }

        this.in_process = true;
        const headers = new Headers();

        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + this.access_token);

        let options = {
            method: method,
            headers: headers,
        }

        if (this.body_data !== null && Object.keys(this.body_data).length > 0) {
            options.body = JSON.stringify(this.body_data);
        }

        return fetch(this.base_uri + path, options)
            .then(resp => resp.json())
            .finally(() => {
                setTimeout(() => {
                    this.body_data = null;
                    this.in_process = false;
                }, 800);
            });
    }
}

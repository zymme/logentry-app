"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const { ForbiddenError } = require("moleculer-web").Errors;

const DbService = require("../mixins/db.mixin");

module.exports = {
    name: "logentry",
    mixins: [

        DbService("logentries")
    ],

    settings: {

        /** public fields */
        fields: ["_id", "activity", "date", "user", "notes", "duration"],

        /** Validator schema for entity */
		entityValidator: {
			user: { type: "string", min: 2 },
			activity: { type: "string", min: 3 },
			date: { type: "string" },
			notes: { type: "string", max: 350, optional: false },
			duration: { type: "string", optional: true },
		}
    },

    actions: {

        /**
         * Create log entry
         */
        create: {

            params: {
                logentry: { type: "object" }
            },
            async handler(ctx) {
                console.log("Entered create runlog entry!");
                let entity = ctx.params.logentry;                
                console.log(`logentry passed in: ${entity.activity}`);

                return this.validateEntity(entity)
                .then(() => {

                    this.adapter.insert(entity)
                    .then( doc => {
                        console.log(doc);
                        return doc;
                    });

                });
            }

        } // create
        ,

        /**
         * Get a runlog entry by id
         * 
         * @param {String} id 
         * 
         * @returns {Object} runlog entry
         */
        get: {

            handler(ctx) {
                console.log("Entered GET for runlog");

                return `Returning runlog entry for ${ctx.params.id}`;
            }
        }

    },

    /**
	 * Service created lifecycle event handler
	 */
	created() {
        console.log("In the created() lifecycle event handler...");
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {
        console.log("In service started lifecycle event handler...");
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {
        console.log("In Service stopped lifecycle event handler...");
	}



}
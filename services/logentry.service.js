"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const { ForbiddenError } = require("moleculer-web").Errors;

const DbService = require("../mixins/db.mixin");

const OidcService = require("../mixins/oidc-client.mixin");

module.exports = {
    name: "logentry",
    mixins: [

        DbService("logentries"),
        OidcService()
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
         *
         * @param {Object} log entry
         *
         * @returns {Object} the created log entry
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

                      return this.adapter.insert(entity)
                            .then(resp => {
                              console.log(`entitiy created ${JSON.stringify(resp)}`)
                              return this.Promise.resolve(resp);
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
                

                return this.Promise.resolve()
                    .then (() => this.adapter.findById(ctx.params.id)
                    .then(resp => {
                        console.log(`returned from db ${resp._id}`);
                        return resp;
                        })
                    );

                //return `Returning runlog entry for ${ctx.params.id}`;
            }
        },

        getAll: {

            handler(ctx) {
                console.log('Entered getAll() for entries');

                return this.Promise.resolve()
                    .then(() => this.adapter.find() 
                    .then(resp => {
                        console.log('dataset returned');
                        return resp;
                        })
                    );
            }


        }   //getAll


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

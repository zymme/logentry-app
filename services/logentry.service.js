"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const { ForbiddenError } = require("moleculer-web").Errors;

const DbService = require("../mixins/db.mixin");

module.exports = {
    name: "logentry",
    mixins: [

        DbService("logentries")
    ],

    actions: {

        create: {

            params: {
                logentry: { type: "object" }
            },
            async handler(ctx) {
                console.log("Entered create runlog entry!");
                let entity = ctx.params.logentry;                
                console.log(`logentry passed in: ${entity.activity}`);

                return this.adapter.insert(entity)
                    .then( doc => {
                        console.log(doc);
                        return doc;
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

    }



}
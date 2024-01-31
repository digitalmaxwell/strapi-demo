'use strict';

/**
 * default-lander service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::default-lander.default-lander');

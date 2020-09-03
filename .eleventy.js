/**
 * @fileoverview Configuration file for 11ty.
 * @see https://www.11ty.dev/docs/config/
 */

const { aggregateStyles } = require('./src/11ty/filters/styles.js');
const { short } = require('./src/11ty/filters/git.js');
const { format: formatDate } = require('./src/11ty/filters/dates.js');

module.exports = function (config) {
    // Process markdown and Nunjucks templates.
    // Pass through *.css files to the output directory.
    config.setTemplateFormats(['md', 'njk', 'css']);

    // Add filters.
    config.addFilter('date', formatDate);
    config.addFilter('short', short);

    // Aggregate a list of CSS file references into a de-duplicated and
    // concatenated string of their content. Useful to pipe into `safe` and
    // place into a `<style />` tag to apply all the styles.
    config.addNunjucksAsyncFilter('aggregateStyles', aggregateStyles);

    // Print the given data to the console for debugging purposes.
    config.addFilter('debug', (data) => {
        console.log(data);
        return data;
    });

    return {
        dir: {
            input: 'src/www/',

            // Move _data/ outside input directory so it can be compiled as 11ty
            // code without conflicting with other build targets.
            data: '../11ty/_data/',
        },
    };
};

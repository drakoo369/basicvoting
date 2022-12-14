const CracoLessPlugin = require("craco-less");

module.exports ={
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars:{
                            
                    "@primary-color": "#1890ff" // primary color for all components

                        },
                        javascriptEnabled :true,
                    }
                }
            }
        }
    ]
};
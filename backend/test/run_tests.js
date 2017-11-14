function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}
importTest("openConnection", './open_connection_test.js');
importTest("openChannel", './open_channel_test.js');
importTest("closeChannel", './close_channel_test.js');
importTest("closeConnection", './close_connection_test.js');

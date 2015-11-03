import privateData from "incognito";

export default function listen(portNumber, callback) {
    const _ = privateData(this);
    _.router.listen(portNumber, callback);
}

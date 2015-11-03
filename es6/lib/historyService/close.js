import privateData from "incognito";

export default function close(callback) {
    privateData(this).router.close(callback);
}

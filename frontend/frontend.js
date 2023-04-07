const near = require('near-api-js');
const contractName = 'real_estate_project';
const keyStore = new near.keyStores.InMemoryKeyStore();
const nearConnection = near.Connection(near.networkId, near.rpc, keyStore, { 
    provider: {
        type: 'JsonRpcProvider',
        args: { url: 'https://rpc.testnet.near.org' }
    },
});

const accountId = 'bambam870.testnet';

async function init() {
    window.near = near;
    window.walletConnection = new nearAPI.WalletConnection(window.near, accountId);
    window.account = await nearConnection.account(accountId);
    const contractId = contractName + '.' + accountId;
    window.contract = new nearAPI.Contract(window.account, contractId, {
        viewMethods: ['get_property'],
        changeMethods: ['add_property'],
    });
}
init();

const html = `
    <form>
        <label for="id">ID:</label>
        <input type="text" id="id" name="id"><br>

        <label for="address">Address:</label>
        <input type="text" id="address" name="address"><br>

        <label for="price">Price:</label>
        <input type="text" id="price" name="price"><br>

        <button type="button" onclick="addProperty()">Add Property</button>
        <button type="button" onclick="getProperty()">Get Property</button>

        <div id="result"></div>
    </form>
`;

document.body.innerHTML = html;

const addProperty = async () => {
    const id = document.getElementById('id').value;
    const address = document.getElementById('address').value;
    const price = parseInt(document.getElementById('price').value);

    await contract.add_property({ id, address, price });

    document.getElementById('result').innerText = 'Property added!';
};

const getProperty = async () => {
    const id = document.getElementById('id').value;

    const property = await contract.get_property({ id });

    document.getElementById('result').innerText = JSON.stringify(property);
};

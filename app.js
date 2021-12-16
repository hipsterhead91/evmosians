const env = "testnet";
const chainId = 9000;
const price = 0;
let address;

const contractAddress1 = "0x0f9963FDBD67C513c2f660965a652AC691087C30"; // Evmosian
const contractAddress2 = "0xebe59e92c17f96c05fac65f9e03b7717f73370fd"; // Validator
const contractAddress3 = "0xde6b8e55a50d7ecff79daaf23404497c00e23f9f"; // Builder
const contractAddress4 = "0xe57a88ec1b54378499a104c3942e35d3705b70b3"; // Educator

const etherscanUrl = "https://evm.evmos.org/tx";
let provider = null;

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_approved",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NOT_CURRENT_OWNER",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "_interfaceID",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "_symbol",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "url",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.onload = () => {

	window?.ethereum?.on("disconnect", () => {
		window.location.reload();
	});

	window?.ethereum?.on("networkChanged", () => {
		window.location.reload();
	});

	window?.ethereum?.on("chainChanged", () => {
		window.location.reload();
	});

	// попап
	const popup = document.getElementById("popup");
	const popupContainer = document.getElementById("popup-container");
	const closePopup = () => {
		popup.classList.add("popup_hidden")
		popupContainer.querySelector(".popup__image").remove();
		popupContainer.querySelector(".popup__heading").remove();
		popupContainer.querySelector(".popup__link").remove();
	}
	document.getElementById("popup-close").addEventListener('click', closePopup);

	// подключение кошелька
	const connectWallet = async () => {
		await window.ethereum.enable();
		if (Number(window.ethereum.chainId) !== chainId) {
			return failedConnectWallet();
		}
		provider = new ethers.providers.Web3Provider(window.ethereum);
		const accounts = await provider.send("eth_requestAccounts");
		document.getElementById("network-button").innerHTML = accounts[0];
	};

	// ошибка нетворка
	const failedConnectWallet = () => {
		document.getElementById("network-button").innerHTML = "error, switch to Evmos";
	};

	// переключение сети
	const switchNetwork = async () => {
		if (env === "test") {
			window?.ethereum
				?.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "9000",
							chainName: "Evmos Testnet",
							nativeCurrency: {
								name: "PHOTON",
								symbol: "PHOTON",
								decimals: 18,
							},
							rpcUrls: ["https://evmos-testnet.gateway.pokt.network/v1/lb/61ac07b995d548003aedf5ee"],
							blockExplorerUrls: ["https://evm.evmos.org"],
						},
					],
				})
				.then(() => {
					connectWallet();
				})
				.catch(() => {
					failedConnectWallet();
				});
		} else {
			window?.ethereum
				?.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "9000",
							chainName: "Evmos Testnet",
							nativeCurrency: {
								name: "PHOTON",
								symbol: "PHOTON",
								decimals: 18,
							},
							rpcUrls: ["https://evmos-testnet.gateway.pokt.network/v1/lb/61ac07b995d548003aedf5ee"],
							blockExplorerUrls: ["https://evm.evmos.org"],
						},
					],
				})
				.then(() => {
					connectWallet();
				})
				.catch(() => {
					failedConnectWallet();
				});
		}
	};

	document.getElementById("network-button").addEventListener("click", switchNetwork);
	connectWallet();

	const handleMint = async (buttonId, buttonText, contractAddress, image) => {
		$.toast().reset("all");
		if (!provider) {
			connectWallet();
		} else {
			try {
				document.getElementById(buttonId).innerHTML = "minting...";
				const signer = await provider.getSigner();
				const ImageContract = new ethers.Contract(contractAddress, abi, signer);
				const response = await ImageContract.mint();
				$.toast({
					heading: "minting",
					text: "start to minting ",
					position: "top-center",
					showHideTransition: "fade",
					hideAfter: 10000,
					icon: "info",
				});
				const result = await response.wait();
				console.log(result);
				let tokenId = result.events[0].args._tokenId.toString();
				let txHash = result.transactionHash;
				let html = `<img class='popup__image' src='${image}'><h3 class='popup__heading'>your NFT has number ${tokenId}</h3><a class='popup__link' href='https://evm.evmos.org/tx/${txHash}' target='_blank'> view on explorer</a>`;
				popupContainer.insertAdjacentHTML('afterbegin', html);
				popup.classList.remove("popup_hidden");
				$.toast().reset("all");
				$.toast({
					heading: "success",
					text: "minted success",
					showHideTransition: "slide",
					position: "top-center",
					icon: "success",
				});
				document.getElementById(buttonId).innerHTML = buttonText;
			} catch (e) { }
		}
	};

	// Evmosian
	const mint1 = document.getElementById("minting-button-1");
	mint1.addEventListener("click", () => handleMint('minting-button-1', 'mint <span>Evmosian</span> NFT', contractAddress1, 'images/evmosian-1.gif'));

	// Validator
	const mint2 = document.getElementById("minting-button-2");
	mint2.addEventListener("click", () => handleMint('minting-button-2', 'mint <span>Validator</span> NFT', contractAddress2, 'images/evmosian-2.gif'));

	// Builder
	const mint3 = document.getElementById("minting-button-3");
	mint3.addEventListener("click", () => handleMint('minting-button-3', 'mint <span>Builder</span> NFT', contractAddress3, 'images/evmosian-3.gif'));

	// Educator
	const mint4 = document.getElementById("minting-button-4");
	mint4.addEventListener("click", () => handleMint('minting-button-4', 'mint <span>Educator</span> NFT', contractAddress4, 'images/evmosian-4.gif'));
};
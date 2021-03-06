# Dash Paper Wallet Tool

This tool takes the output from paper.dash.org and generates a csv file showing all address balances.

### Pre-requisites

* **Node version 8.x** (install from the [Node.js website](https://nodejs.org/en/))
* **git** (install after installing node using `npm install git`)

### 1. Obtain Dash paper wallets

1. Go to paper.dash.org
1. Move mouse around until address is generated (100% is reached)
1. Click **paper wallet**
1. Click **generate** button after filling out form if you want more addresses
1. Click the small hamburger menu icon (three horizontal lines) at the bottom of the page
1. Copy the entire text (including the `# = 4` line) and save somewhere for later

### 2. Prepare a working directory

1. Open a terminal shell
1. Navigate to the folder you'd like to work in
1. Run the following commands

* `git clone https://github.com/riongull/paper_wallet_tools.git`
* `cd paper_wallet_tools`
* `npm install`

### 3. Replace example data

1. Replace the data in `paper.dash.org.txt` with your own (from step 1.6 above)
1. Replace the blockcypher API key in `.env` with your own (register at blockcypher.com)
    * please do this if you plan to make many API requests.

### 4. Run the script

* `node paper_wallet_balances.js`

### Notes

* This script works, but may have some edge-case bugs.

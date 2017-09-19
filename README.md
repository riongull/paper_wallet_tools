# Dash Paper Wallet Tool
This tool takes the output of paper wallets generated from paper.dash.org and generates a csv file showing the balances of all dash addresses.

### Pre-requisites
* *Node version 8.x* (install from the [Node.js website][https://nodejs.org/en/])
* *git* (install after installing node using `npm install git`)

### 1. Obtain Dash Paper Wallets
1. Go to paper.dash.org
2. Move mouse around until address is generated (100% is reached)
3. Click *paper wallet*
4. Click *generate* button after filling out form if you want more addresses
5. Click the small hamburger menu icon (three horizontal lines) at the bottom of the page
6. Copy the entire text (including the `# = 4` line) and save somewhere for later

### 2. Prepare a working directory
1. Open a terminal shell
2. Navigate to the folder you'd like to work in
3. Run the following commands

* `git clone https://github.com/riongull/paper_wallet_tools.git`
* `cd paper_wallet_tools`
* `npm install`

### 3. Replace example data
1. Replace the data in `paper.dash.org.txt` with your own (from step 1.6 above)
2. Replace the blockcypher API key in `.env` with your own (register at blockcypher.com)
    * this is optional, if you plan to make many API requests.

### 4. Run the script
* `node parse_pw_textfile.js` (use node version 8.x)

### Notes
* This script works, but may have some edge-case bugs.

let {migration ,createAndAddErc20,AddCollateral0} = require("./testFunction.js");
let collateral0 = "0x0000000000000000000000000000000000000000";

const BN = require("bn.js");
contract('OptionsManagerV2', function (accounts){
    it('OptionsManagerV2 getting and setting test functions', async function (){
        let contracts = await migration(accounts);
        await AddCollateral0(contracts);
        await createAndAddErc20(contracts);
        let result = await contracts.manager.getCollateralRate(collateral0);
        assert.equal(result.toString(10),"3000","getCollateralRate Error");
        result = await contracts.manager.getCollateralRate(contracts.FNX.address);
        assert.equal(result.toString(10),"5000","getCollateralRate Error");

        await contracts.manager.setCollateralRate(collateral0,1500);
        result = await contracts.manager.getCollateralRate(collateral0);
        assert.equal(result.toString(10),"1500","getCollateralRate Error");
        await contracts.manager.setCollateralRate(contracts.FNX.address,4500);
        result = await contracts.manager.getCollateralRate(contracts.FNX.address);
        assert.equal(result.toString(10),"4500","getCollateralRate Error");
        result = await contracts.manager.getUserPayingUsd(accounts[0]);
        assert.equal(result,0,"getUserPayingUsd Error");
        result = await contracts.manager.userInputCollateral(accounts[0],collateral0);
        assert.equal(result,0,"userInputCollateral Error");
        result = await contracts.manager.userInputCollateral(accounts[0],contracts.FNX.address);
        assert.equal(result,0,"userInputCollateral Error");
        result = await contracts.manager.getUserTotalWorth(accounts[0]);
        assert.equal(result,0,"getUserTotalWorth Error");
        result = await contracts.manager.getTokenNetworth();
        assert.equal(result,1e8,"getTokenNetworth Error");
        result = await contracts.manager.getOccupiedCollateral();
        assert.equal(result,0,"getOccupiedCollateral Error");
        result = await contracts.manager.getAvailableCollateral();
        assert.equal(result,0,"getAvailableCollateral Error");
        result = await contracts.manager.getLeftCollateral();
        assert.equal(result,0,"getLeftCollateral Error");
        result = await contracts.manager.getUnlockedCollateral();
        assert.equal(result,0,"getUnlockedCollateral Error");
        result = await contracts.manager.getTotalCollateral();
        assert.equal(result,0,"getTotalCollateral Error");
        result = await contracts.manager.getRealBalance(collateral0);
        assert.equal(result,0,"getRealBalance Error");
        result = await contracts.manager.getRealBalance(contracts.FNX.address);
        assert.equal(result,0,"getRealBalance Error");
        result = await contracts.manager.getNetWorthBalance(collateral0);
        assert.equal(result,0,"getNetWorthBalance Error");
        result = await contracts.manager.getNetWorthBalance(contracts.FNX.address);
        assert.equal(result,0,"getNetWorthBalance Error");
        result = await contracts.manager.calculateCollateralRate();
        assert.equal(result,5000,"calculateCollateralRate Error");
        result = await contracts.manager.getPriceRateRange();
        assert.equal(result[0],500,"getPriceRateRange Error");
        assert.equal(result[1],1500,"getPriceRateRange Error");

        await contracts.manager.setPriceRateRange(100,1900);
        result = await contracts.manager.getPriceRateRange();
        assert.equal(result[0],100,"getPriceRateRange Error");
        assert.equal(result[1],1900,"getPriceRateRange Error");
    });
});
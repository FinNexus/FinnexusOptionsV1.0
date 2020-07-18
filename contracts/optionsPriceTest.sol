pragma solidity ^0.4.26;

import "./optionsPrice.sol";
contract OptionsPriceTest is OptionsPrice{
    function testCalculateD1D2(uint256 currentPrice, uint256 strikePrice, uint256 expiration)
        public view returns(int256,int256,int256,int256){
        (Fraction.fractionNumber memory d1, Fraction.fractionNumber memory d2) = calculateD1D2(currentPrice,strikePrice,expiration,rate,iv);
        return (d1.numerator,d1.denominator,d2.numerator,d2.denominator);
    }
    function testCalculateND(uint256 currentPrice, uint256 strikePrice, uint256 expiration,uint256 ivNumerator,uint256 ivDenominator)
        public view returns(int256,int256,int256,int256){
        Fraction.fractionNumber memory _iv = Fraction.fractionNumber(int256(ivNumerator),int256(ivDenominator));
       (Fraction.fractionNumber memory d1, Fraction.fractionNumber memory d2) = calculateD1D2(currentPrice, strikePrice, expiration, rate, _iv);
        d1 = Fraction.normsDist(d1);
        d1 = d2;
        d2 = Fraction.normsDist(d2);
        return(d1.numerator,d1.denominator,d2.numerator,d2.denominator);
        d1 = Fraction.safeFractionMul(d1, Fraction.fractionNumber(int256(currentPrice),1));
        d2 = Fraction.safeFractionMul(d2, Fraction.fractionNumber(int256(strikePrice),1));
//        Fraction.fractionNumber memory rt = Fraction.safeFractionMul(rate,Fraction.fractionNumber(int256(expiration),int256(Year)));
//        d2 = Fraction.safeFractionMul(d2,Fraction.invert(Fraction.fractionExp(rt)));
//        d1 = Fraction.safeFractionSub(d1, d2);
        return(d1.numerator,d1.denominator,d2.numerator,d2.denominator);
//        return uint256(price.numerator/price.denominator);
    }
}
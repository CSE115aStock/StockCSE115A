import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
export function FilterMethod () {
    const [cap, setCap] = React.useState('any');
    const [div, setdiv] = React.useState('any');
    const [exchange, setExchange] = React.useState('any');
    const [index, setindex] = React.useState('any');
    const [ind, setind] = React.useState('any');
    const [pe, setpe] = React.useState('any');
    const [volume, setvolume] = React.useState('any');
    const [pattern, setpattern] = React.useState('any');
    const [floatShort, setfloatShort] = React.useState('any');
    const [rsi, setrsi] = React.useState('any');
    const [order, setorder] = React.useState('any');
    const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    function createData( ticker, name, sector, industry, country, markcap,pe, price, change, Volume) {
        return { ticker, name, sector, industry, country, markcap,pe, price, change, Volume };
    }
    const [rows, setRows] = React.useState([]);
    return (
        <div className="content">
            <div className="form">
                <div className="form-group">
                    <label htmlFor="Stock">Filter options</label>
                    <div className="form-group">
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">Market Cap:  </label>
                            <select name="cap" id="cap" form="capform"
                            onChange={(event) => setCap(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="mega">$200B+</option>
                                <option value="large">$10B-$200B</option>
                                <option value="mid">$2B-$10B</option>
                                <option value="small">($300M-$2B</option>
                                <option value="micro">$50M-$300M</option>
                                <option value="nano">$50M-</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">Exchange:    </label>
                            <select name="exchange" id="exchange" form="capform"
                            onChange={(event) => setExchange(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="amex">AMEX</option>
                                <option value="nasd">NASDAQ</option>
                                <option value="nyse">NYSE</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">Dividend:    </label>
                            <select name="dividend" id="dividend" form="capform"
                            onChange={(event) => setdiv(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="none">None (0%)</option>
                                <option value="pos">Positive (&gt;0%)</option>
                                <option value="veryhigh">Very High (&gt;10%)</option>
                                <option value="o1">Over 1%</option>
                                <option value="o2">Over 2%</option>
                                <option value="o3">Over 3%</option>
                                <option value="o4">Over 4%</option>
                                <option value="high">High (&gt;5%)</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">Index:    </label>
                            <select name="index" id="index" form="capform"
                            onChange={(event) => setindex(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="sp500">S&amp;P 500</option>
                                <option value="dji">DJIA</option>
                            </select> 
                            </Grid>    
                            <Grid item xs={8}>     
                            <label htmlFor="Stock">Industry:    </label> 
                            <select name="ind" id="ind" form="capform"
                            onChange={(event) => setind(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="stocksonly">Stocks only (ex-Funds)</option>
                                <option value="exchangetradedfund">Exchange Traded Fund</option>
                                <option value="advertisingagencies">Advertising Agencies</option>
                                <option value="aerospacedefense">Aerospace &amp; Defense</option>
                                <option value="agriculturalinputs">Agricultural Inputs</option>
                                <option value="airlines">Airlines</option>
                                <option value="airportsairservices">Airports &amp; Air Services</option>
                                <option value="aluminum">Aluminum</option>
                                <option value="apparelmanufacturing">Apparel Manufacturing</option>
                                <option value="apparelretail">Apparel Retail</option>
                                <option value="assetmanagement">Asset Management</option>
                                <option value="automanufacturers">Auto Manufacturers</option>
                                <option value="autoparts">Auto Parts</option>
                                <option value="autotruckdealerships">Auto &amp; Truck Dealerships</option>
                                <option value="banksdiversified">Banks - Diversified</option>
                                <option value="banksregional">Banks - Regional</option>
                                <option value="beveragesbrewers">Beverages - Brewers</option>
                                <option value="beveragesnonalcoholic">Beverages - Non-Alcoholic</option>
                                <option value="beverageswineriesdistilleries">Beverages - Wineries &amp; Distilleries</option>
                                <option value="biotechnology">Biotechnology</option>
                                <option value="broadcasting">Broadcasting</option>
                                <option value="buildingmaterials">Building Materials</option>
                                <option value="buildingproductsequipment">Building Products &amp; Equipment</option>
                                <option value="businessequipmentsupplies">Business Equipment &amp; Supplies</option>
                                <option value="capitalmarkets">Capital Markets</option>
                                <option value="chemicals">Chemicals</option>
                                <option value="closedendfunddebt">Closed-End Fund - Debt</option>
                                <option value="closedendfundequity">Closed-End Fund - Equity</option>
                                <option value="closedendfundforeign">Closed-End Fund - Foreign</option>
                                <option value="cokingcoal">Coking Coal</option>
                                <option value="communicationequipment">Communication Equipment</option>
                                <option value="computerhardware">Computer Hardware</option>
                                <option value="confectioners">Confectioners</option>
                                <option value="conglomerates">Conglomerates</option>
                                <option value="consultingservices">Consulting Services</option>
                                <option value="consumerelectronics">Consumer Electronics</option>
                                <option value="copper">Copper</option>
                                <option value="creditservices">Credit Services</option>
                                <option value="departmentstores">Department Stores</option>
                                <option value="diagnosticsresearch">Diagnostics &amp; Research</option>
                                <option value="discountstores">Discount Stores</option>
                                <option value="drugmanufacturersgeneral">Drug Manufacturers - General</option>
                                <option value="drugmanufacturersspecialtygeneric">Drug Manufacturers - Specialty &amp; Generic</option>
                                <option value="educationtrainingservices">Education &amp; Training Services</option>
                                <option value="electricalequipmentparts">Electrical Equipment &amp; Parts</option>
                                <option value="electroniccomponents">Electronic Components</option>
                                <option value="electronicgamingmultimedia">Electronic Gaming &amp; Multimedia</option>
                                <option value="electronicscomputerdistribution">Electronics &amp; Computer Distribution</option>
                                <option value="engineeringconstruction">Engineering &amp; Construction</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="exchangetradedfund">Exchange Traded Fund</option>
                                <option value="farmheavyconstructionmachinery">Farm &amp; Heavy Construction Machinery</option>
                                <option value="farmproducts">Farm Products</option>
                                <option value="financialconglomerates">Financial Conglomerates</option>
                                <option value="financialdatastockexchanges">Financial Data &amp; Stock Exchanges</option>
                                <option value="fooddistribution">Food Distribution</option>
                                <option value="footwearaccessories">Footwear &amp; Accessories</option>
                                <option value="furnishingsfixturesappliances">Furnishings, Fixtures &amp; Appliances</option>
                                <option value="gambling">Gambling</option>
                                <option value="gold">Gold</option>
                                <option value="grocerystores">Grocery Stores</option>
                                <option value="healthcareplans">Healthcare Plans</option>
                                <option value="healthinformationservices">Health Information Services</option>
                                <option value="homeimprovementretail">Home Improvement Retail</option>
                                <option value="householdpersonalproducts">Household &amp; Personal Products</option>
                                <option value="industrialdistribution">Industrial Distribution</option>
                                <option value="informationtechnologyservices">Information Technology Services</option>
                                <option value="infrastructureoperations">Infrastructure Operations</option>
                                <option value="insurancebrokers">Insurance Brokers</option>
                                <option value="insurancediversified">Insurance - Diversified</option>
                                <option value="insurancelife">Insurance - Life</option>
                                <option value="insurancepropertycasualty">Insurance - Property &amp; Casualty</option>
                                <option value="insurancereinsurance">Insurance - Reinsurance</option>
                                <option value="insurancespecialty">Insurance - Specialty</option>
                                <option value="integratedfreightlogistics">Integrated Freight &amp; Logistics</option>
                                <option value="internetcontentinformation">Internet Content &amp; Information</option>
                                <option value="internetretail">Internet Retail</option>
                                <option value="leisure">Leisure</option>
                                <option value="lodging">Lodging</option>
                                <option value="lumberwoodproduction">Lumber &amp; Wood Production</option>
                                <option value="luxurygoods">Luxury Goods</option>
                                <option value="marineshipping">Marine Shipping</option>
                                <option value="medicalcarefacilities">Medical Care Facilities</option>
                                <option value="medicaldevices">Medical Devices</option>
                                <option value="medicaldistribution">Medical Distribution</option>
                                <option value="medicalinstrumentssupplies">Medical Instruments &amp; Supplies</option>
                                <option value="metalfabrication">Metal Fabrication</option>
                                <option value="mortgagefinance">Mortgage Finance</option>
                                <option value="oilgasdrilling">Oil &amp; Gas Drilling</option>
                                <option value="oilgasep">Oil &amp; Gas E&amp;P</option>
                                <option value="oilgasequipmentservices">Oil &amp; Gas Equipment &amp; Services</option>
                                <option value="oilgasintegrated">Oil &amp; Gas Integrated</option>
                                <option value="oilgasmidstream">Oil &amp; Gas Midstream</option>
                                <option value="oilgasrefiningmarketing">Oil &amp; Gas Refining &amp; Marketing</option>
                                <option value="otherindustrialmetalsmining">Other Industrial Metals &amp; Mining</option>
                                <option value="otherpreciousmetalsmining">Other Precious Metals &amp; Mining</option>
                                <option value="packagedfoods">Packaged Foods</option>
                                <option value="packagingcontainers">Packaging &amp; Containers</option>
                                <option value="paperpaperproducts">Paper &amp; Paper Products</option>
                                <option value="personalservices">Personal Services</option>
                                <option value="pharmaceuticalretailers">Pharmaceutical Retailers</option>
                                <option value="pollutiontreatmentcontrols">Pollution &amp; Treatment Controls</option>
                                <option value="publishing">Publishing</option>
                                <option value="railroads">Railroads</option>
                                <option value="realestatedevelopment">Real Estate - Development</option>
                                <option value="realestatediversified">Real Estate - Diversified</option>
                                <option value="realestateservices">Real Estate Services</option>
                                <option value="recreationalvehicles">Recreational Vehicles</option>
                                <option value="reitdiversified">REIT - Diversified</option>
                                <option value="reithealthcarefacilities">REIT - Healthcare Facilities</option>
                                <option value="reithotelmotel">REIT - Hotel &amp; Motel</option>
                                <option value="reitindustrial">REIT - Industrial</option>
                                <option value="reitmortgage">REIT - Mortgage</option>
                                <option value="reitoffice">REIT - Office</option>
                                <option value="reitresidential">REIT - Residential</option>
                                <option value="reitretail">REIT - Retail</option>
                                <option value="reitspecialty">REIT - Specialty</option>
                                <option value="rentalleasingservices">Rental &amp; Leasing Services</option>
                                <option value="residentialconstruction">Residential Construction</option>
                                <option value="resortscasinos">Resorts &amp; Casinos</option>
                                <option value="restaurants">Restaurants</option>
                                <option value="scientifictechnicalinstruments">Scientific &amp; Technical Instruments</option>
                                <option value="securityprotectionservices">Security &amp; Protection Services</option>
                                <option value="semiconductorequipmentmaterials">Semiconductor Equipment &amp; Materials</option>
                                <option value="semiconductors">Semiconductors</option>
                                <option value="shellcompanies">Shell Companies</option>
                                <option value="silver">Silver</option>
                                <option value="softwareapplication">Software - Application</option>
                                <option value="softwareinfrastructure">Software - Infrastructure</option>
                                <option value="solar">Solar</option>
                                <option value="specialtybusinessservices">Specialty Business Services</option>
                                <option value="specialtychemicals">Specialty Chemicals</option>
                                <option value="specialtyindustrialmachinery">Specialty Industrial Machinery</option>
                                <option value="specialtyretail">Specialty Retail</option>
                                <option value="staffingemploymentservices">Staffing &amp; Employment Services</option>
                                <option value="steel">Steel</option>
                                <option value="telecomservices">Telecom Services</option>
                                <option value="textilemanufacturing">Textile Manufacturing</option>
                                <option value="thermalcoal">Thermal Coal</option>
                                <option value="tobacco">Tobacco</option>
                                <option value="toolsaccessories">Tools &amp; Accessories</option>
                                <option value="travelservices">Travel Services</option>
                                <option value="trucking">Trucking</option>
                                <option value="uranium">Uranium</option>
                                <option value="utilitiesdiversified">Utilities - Diversified</option>
                                <option value="utilitiesindependentpowerproducers">Utilities - Independent Power Producers</option>
                                <option value="utilitiesregulatedelectric">Utilities - Regulated Electric</option>
                                <option value="utilitiesregulatedgas">Utilities - Regulated Gas</option>
                                <option value="utilitiesregulatedwater">Utilities - Regulated Water</option>
                                <option value="utilitiesrenewable">Utilities - Renewable</option>
                                <option value="wastemanagement">Waste Management</option>
                                <option value="modal">Custom (Elite only)</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">pe:    </label> 
                            <select name="pe" id="pe" form="capform"
                            onChange={(event) => setpe(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="low">Low (&lt;15)</option>
                                <option value="profitable">Profitable (&gt;0)</option>
                                <option value="high">High (&gt;50)</option>
                                <option value="u5">Under 5</option>
                                <option value="u10">Under 10</option>
                                <option value="u15">Under 15</option>
                                <option value="u20">Under 20</option>
                                <option value="u25">Under 25</option>
                                <option value="u30">Under 30</option>
                                <option value="u35">Under 35</option>
                                <option value="u40">Under 40</option>
                                <option value="u45">Under 45</option>
                                <option value="u50">Under 50</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">volume:    </label> 
                            <select name="volume" id="volume" form="capform"
                            onChange={(event) => setvolume(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="o400">Over 400K</option>
                                <option value="o500">Over 500K</option>
                                <option value="o750">Over 750K</option>
                                <option value="o1000">Over 1M</option>
                                <option value="o2000">Over 2M</option>
                                <option value="o5000">Over 5M</option>
                                <option value="o10000">Over 10M</option>
                                <option value="o20000">Over 20M</option>
                                <option value="range">Custom (Elite only)</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">Pattern:    </label> 
                            <select name="pattern" id="pattern" form="capform"
                            onChange={(event) => setpattern(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="horizontal">Horizontal S/R</option>
                                <option value="horizontal2">Horizontal S/R (Strong)</option>
                                <option value="tlresistance">TL Resistance</option>
                                <option value="tlresistance2">TL Resistance (Strong)</option>
                                <option value="tlsupport">TL Support</option>
                                <option value="tlsupport2">TL Support (Strong)</option>
                                <option value="wedgeup">Wedge Up</option>
                                <option value="wedgeup2">Wedge Up (Strong)</option>
                                <option value="wedgedown">Wedge Down</option>
                                <option value="wedgedown2">Wedge Down (Strong)</option>
                                <option value="wedgeresistance">Triangle Ascending</option>
                                <option value="wedgeresistance2">Triangle Ascending (Strong)</option>
                                <option value="wedgesupport">Triangle Descending</option>
                                <option value="wedgesupport2">Triangle Descending (Strong)</option>
                                <option value="wedge">Wedge</option>
                                <option value="wedge2">Wedge (Strong)</option>
                                <option value="channelup">Channel Up</option>
                                <option value="channelup2">Channel Up (Strong)</option>
                                <option value="channeldown">Channel Down</option>
                                <option value="channeldown2">Channel Down (Strong)</option>
                                <option value="channel">Channel</option>
                                <option value="channel2">Channel (Strong)</option>
                                <option value="doubletop">Double Top</option>
                                <option value="doublebottom">Double Bottom</option>
                                <option value="multipletop">Multiple Top</option>
                                <option value="multiplebottom">Multiple Bottom</option>
                                <option value="headandshoulders">Head &amp; Shoulders</option>
                                <option value="headandshouldersinv">Head &amp; Shoulders Inverse</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">Short Float:    </label> 
                            <select name="floatShort" id="floatShort" form="capform"
                            onChange={(event) => setfloatShort(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="low">Low (&lt;5%)</option>
                                <option value="high">High (&gt;20%)</option>
                                <option value="u5">Under 5%</option>
                                <option value="u10">Under 10%</option>
                                <option value="u15">Under 15%</option>
                                <option value="u20">Under 20%</option>
                                <option value="u25">Under 25%</option>
                                <option value="u30">Under 30%</option>
                                <option value="o5">Over 5%</option>
                                <option value="o10">Over 10%</option>
                                <option value="o15">Over 15%</option>
                                <option value="o20">Over 20%</option>
                                <option value="o25">Over 25%</option>
                                <option value="o30">Over 30%</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">RSI:    </label> 
                            <select name="rsi" id="rsi" form="capform"
                            onChange={(event) => setrsi(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="ob90">Overbought (90)</option>
                                <option value="ob80">Overbought (80)</option>
                                <option value="ob70">Overbought (70)</option>
                                <option value="ob60">Overbought (60)</option>
                                <option value="os40">Oversold (40)</option>
                                <option value="os30">Oversold (30)</option>
                                <option value="os20">Oversold (20)</option>
                                <option value="os10">Oversold (10)</option>
                                <option value="nob60">Not Overbought (&lt;60)</option>
                                <option value="nob50">Not Overbought (&lt;50)</option>
                                <option value="nos50">Not Oversold (&gt;50)</option>
                                <option value="nos40">Not Oversold (&gt;40)</option>
                            </select>
                            </Grid>
                            <Grid item xs={8}>
                            <label htmlFor="Stock">order:    </label> 
                            <select name="order" id="order" form="capform"
                            onChange={(event) => setorder(event.target.value)}>
                                <option value="any">No Filter</option>
                                <option value="o=ticker">Ticker</option>
                                <option value="o=company">Company</option>
                                <option value="o=sector">Sector</option>
                                <option value="o=industry">Industry</option>
                                <option value="o=country">Country</option>
                                <option value="o=marketcap">Market Cap.</option>
                                <option value="o=pe">Price/Earnings</option>
                                <option value="o=forwardpe">Forward Price/Earnings</option>
                                <option value="o=peg">PEG (Price/Earnings/Growth)</option>
                                <option value="o=ps">Price/Sales</option>
                                <option value="o=pb">Price/Book</option>
                                <option value="o=pc">Price/Cash</option>
                                <option value="o=pfcf">Price/Free Cash Flow</option>
                                <option value="o=dividendyield">Dividend Yield</option>
                                <option value="o=payoutratio">Payout Ratio</option>
                                <option value="o=eps">EPS (ttm)</option>
                                <option value="o=epsyoy">EPS growth this year</option>
                                <option value="o=epsyoy1">EPS growth next year</option>
                                <option value="o=eps5years">EPS growth past 5 years</option>
                                <option value="o=estltgrowth">EPS growth next 5 years</option>
                                <option value="o=sales5years">Sales growth past 5 years</option>
                                <option value="o=epsqoq">EPS growth qtr over qtr</option>
                                <option value="o=salesqoq">Sales growth qtr over qtr</option>
                                <option value="o=sharesoutstanding2">Shares Outstanding</option>
                                <option value="o=sharesfloat">Shares Float</option>
                                <option value="o=insiderown">Insider Ownership</option>
                                <option value="o=insidertrans">Insider Transactions</option>
                                <option value="o=instown">Institutional Ownership</option>
                                <option value="o=insttrans">Institutional Transactions</option>
                                <option value="o=shortinterestshare">Short Interest Share</option>
                                <option value="o=shortinterestratio">Short Interest Ratio</option>
                                <option value="o=earningsdate">Earnings Date</option>
                                <option value="o=roa">Return on Assets</option>
                                <option value="o=roe">Return on Equity</option>
                                <option value="o=roi">Return on Investment</option>
                                <option value="o=curratio">Current Ratio</option>
                                <option value="o=quickratio">Quick Ratio</option>
                                <option value="o=ltdebteq">LT Debt/Equity</option>
                                <option value="o=debteq">Total Debt/Equity</option>
                                <option value="o=grossmargin">Gross Margin</option>
                                <option value="o=opermargin">Operating Margin</option>
                                <option value="o=netmargin">Net Profit Margin</option>
                                <option value="o=recom">Analyst Recommendation</option>
                                <option value="o=perf1w">Performance (Week)</option>
                                <option value="o=perf4w">Performance (Month)</option>
                                <option value="o=perf13w">Performance (Quarter)</option>
                                <option value="o=perf26w">Performance (Half Year)</option>
                                <option value="o=perf52w">Performance (Year)</option>
                                <option value="o=perfytd">Performance (Year To Date)</option>
                                <option value="o=beta">Beta</option>
                                <option value="o=averagetruerange">Average True Range</option>
                                <option value="o=volatility1w">Volatility (Week)</option>
                                <option value="o=volatility4w">Volatility (Month)</option>
                                <option value="o=sma20">20-Day SMA (Relative)</option>
                                <option value="o=sma50">50-Day SMA (Relative)</option>
                                <option value="o=sma200">200-Day SMA (Relative)</option>
                                <option value="o=high50d">50-Day High (Relative)</option>
                                <option value="o=low50d">50-Day Low (Relative)</option>
                                <option value="o=high52w">52-Week High (Relative)</option>
                                <option value="o=low52w">52-Week Low (Relative)</option>
                                <option value="o=rsi">Relative Strength Index (14)</option>
                                <option value="o=averagevolume">Average Volume (3 Month)</option>
                                <option value="o=relativevolume">Relative Volume</option>
                                <option value="o=change">Change</option>
                                <option value="o=changeopen">Change from Open</option>
                                <option value="o=gap">Gap</option>
                                <option value="o=volume">Volume</option>
                                <option value="o=price">Price</option>
                                <option value="o=targetprice">Target Price</option>
                                <option value="o=ipodate">IPO Date</option>
                            </select>
                        </Grid>
                        </Grid>
                    </div>
                    </div>
            </div>
            <div className="footer">
            <button type="button" className="btn"
                    onClick={async () => {
                        fetch('/recomend/screener', {
                        method: 'POST',
                        body: JSON.stringify({
                            "cap": "cap_"+cap,
                            "exchange":"exch_"+exchange,
                            "dividend": "fa_div_"+div,
                            "index": "idx_"+index,
                            "ind": "ind_"+ind,
                            "pe":"fa_pe_"+pe,
                            "volume": "sh_curvol_"+volume,
                            "floatShort":"sh_short_"+floatShort,
                            "rsi": "ta_rsi_"+rsi,
                            "order":order,
                            "pattern":"ta_pattern_"+pattern
                        })
                        } ).then(
                            res => res.json()
                        ).then(
                            tk => {
                                var newRows = []
                                tk.response.map((row) => newRows.push(createData(row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10])));
                                setRows(newRows)
                            }
                        )
                    }}>
                    Recomend
                </button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Stock Ticker</TableCell>
                        <TableCell align="right">Company Name</TableCell>
                        <TableCell align="right">Sector&nbsp;(g)</TableCell>
                        <TableCell align="right">Industry&nbsp;(g)</TableCell>
                        <TableCell align="right">Country&nbsp;(g)</TableCell>
                        <TableCell align="right">Market Cap</TableCell>
                        <TableCell align="right">P/E&nbsp;(g)</TableCell>
                        <TableCell align="right">Price&nbsp;(g)</TableCell>
                        <TableCell align="right">Percent Change&nbsp;(g)</TableCell>
                        <TableCell align="right">Volume&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <TableRow
                        key={row.ticker}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {row.ticker}
                        </TableCell>
                        <TableCell align="right">{row.ticker}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.sector}</TableCell>
                        <TableCell align="right">{row.industry}</TableCell>
                        <TableCell align="right">{row.country}</TableCell>
                        <TableCell align="right">{row.markcap}</TableCell>
                        <TableCell align="right">{row.pe}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.change}</TableCell>
                        <TableCell align="right">{row.Volume}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

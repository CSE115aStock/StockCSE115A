import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import {Box} from '@mui/material';

/**
 *
 * @return {Object} JSX
 */
export function FilterMethod() {
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

  /**
   *
   * @param {*} ticker
   * @param {*} name
   * @param {*} sector
   * @param {*} industry
   * @param {*} country
   * @param {*} markcap
   * @param {*} pe
   * @param {*} price
   * @param {*} change
   * @param {*} Volume
   * @return {Object} Values
   */
  function createData( ticker, name, sector, industry, country,
      markcap, pe, price, change, Volume) {
    return {ticker, name, sector, industry, country, markcap,
      pe, price, change, Volume};
  }
  const [rows, setRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };


  return (
    <div className="content">
      <div className="form">
        <div className="form-group">
          <div className="form-group">
            <Button variant="outlined" onClick={handleClickOpen}>
              Filter Options
            </Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Fill the form</DialogTitle>
              <DialogContent>
                <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="cap-label">Market Cap</InputLabel>
                    <Select
                      labelId="cap-label"
                      name="cap"
                      id="cap"
                      form="capform"
                      label='Market Cap'
                      value={cap}
                      onChange={(event) => setCap(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="mega">$200B+</MenuItem>
                      <MenuItem value="large">$10B-$200B</MenuItem>
                      <MenuItem value="mid">$2B-$10B</MenuItem>
                      <MenuItem value="small">($300M-$2B</MenuItem>
                      <MenuItem value="micro">$50M-$300M</MenuItem>
                      <MenuItem value="nano">$50M-</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="exchange-label">Exchange</InputLabel>
                    <Select
                      labelId="exchange-label"
                      name="exchange"
                      id="exchange"
                      form="capform"
                      label='Exchange'
                      value={exchange}
                      onChange={(event) => setExchange(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="amex">AMEX</MenuItem>
                      <MenuItem value="nasd">NASDAQ</MenuItem>
                      <MenuItem value="nyse">NYSE</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="dividend-label">Dividend</InputLabel>
                    <Select
                      labelId="dividend-label"
                      name="dividend"
                      id="dividend"
                      form="capform"
                      label='Dividend'
                      value={div}
                      onChange={(event) => setdiv(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="none">None (0%)</MenuItem>
                      <MenuItem value="pos">Positive (&gt;0%)</MenuItem>
                      <MenuItem value="veryhigh">Very High (&gt;10%)
                      </MenuItem>
                      <MenuItem value="o1">Over 1%</MenuItem>
                      <MenuItem value="o2">Over 2%</MenuItem>
                      <MenuItem value="o3">Over 3%</MenuItem>
                      <MenuItem value="o4">Over 4%</MenuItem>
                      <MenuItem value="high">High (&gt;5%)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="index-label">Index</InputLabel>
                    <Select
                      labelId="index-label"
                      name="index"
                      id="index"
                      form="capform"
                      label='Index'
                      value={index}
                      onChange={(event) => setindex(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="sp500">S&amp;P 500</MenuItem>
                      <MenuItem value="dji">DJIA</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="ind-label">Industry</InputLabel>
                    <Select
                      labelId="ind-label"
                      name="ind"
                      id="ind"
                      form="capform"
                      label='Industry'
                      value={ind}
                      onChange={(event) => setind(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="stocksonly">Stocks only (ex-Funds)
                      </MenuItem>
                      <MenuItem value="exchangetradedfund">
                        Exchange Traded Fund</MenuItem>
                      <MenuItem value="advertisingagencies">
                        Advertising Agencies</MenuItem>
                      <MenuItem value="aerospacedefense">
                        Aerospace &amp; Defense</MenuItem>
                      <MenuItem value="agriculturalinputs">
                        Agricultural Inputs</MenuItem>
                      <MenuItem value="airlines">Airlines</MenuItem>
                      <MenuItem value="airportsairservices">
                        Airports &amp; Air Services</MenuItem>
                      <MenuItem value="aluminum">Aluminum</MenuItem>
                      <MenuItem value="apparelmanufacturing">
                        Apparel Manufacturing</MenuItem>
                      <MenuItem value="apparelretail">
                        Apparel Retail</MenuItem>
                      <MenuItem value="assetmanagement">
                        Asset Management</MenuItem>
                      <MenuItem value="automanufacturers">
                        Auto Manufacturers</MenuItem>
                      <MenuItem value="autoparts">Auto Parts</MenuItem>
                      <MenuItem value="autotruckdealerships">
                        Auto &amp; Truck Dealerships</MenuItem>
                      <MenuItem value="banksdiversified">
                        Banks - Diversified</MenuItem>
                      <MenuItem value="banksregional">
                        Banks - Regional</MenuItem>
                      <MenuItem value="beveragesbrewers">
                        Beverages - Brewers</MenuItem>
                      <MenuItem value="beveragesnonalcoholic">
                        Beverages - Non-Alcoholic</MenuItem>
                      <MenuItem value="beverageswineriesdistilleries">
                        Beverages - Wineries &amp; Distilleries</MenuItem>
                      <MenuItem value="biotechnology">Biotechnology</MenuItem>
                      <MenuItem value="broadcasting">Broadcasting</MenuItem>
                      <MenuItem value="buildingmaterials">Building Materials
                      </MenuItem>
                      <MenuItem value="buildingproductsequipment">
                        Building Products &amp; Equipment</MenuItem>
                      <MenuItem value="businessequipmentsupplies">
                        Business Equipment &amp; Supplies</MenuItem>
                      <MenuItem value="capitalmarkets">Capital Markets
                      </MenuItem>
                      <MenuItem value="chemicals">Chemicals</MenuItem>
                      <MenuItem value="closedendfunddebt">
                        Closed-End Fund - Debt</MenuItem>
                      <MenuItem value="closedendfundequity">
                        Closed-End Fund - Equity</MenuItem>
                      <MenuItem value="closedendfundforeign">
                        Closed-End Fund - Foreign</MenuItem>
                      <MenuItem value="cokingcoal">Coking Coal</MenuItem>
                      <MenuItem value="communicationequipment">
                        Communication Equipment</MenuItem>
                      <MenuItem value="computerhardware">
                        Computer Hardware</MenuItem>
                      <MenuItem value="confectioners">
                        Confectioners</MenuItem>
                      <MenuItem value="conglomerates">
                        Conglomerates</MenuItem>
                      <MenuItem value="consultingservices">
                        Consulting Services</MenuItem>
                      <MenuItem value="consumerelectronics">
                        Consumer Electronics</MenuItem>
                      <MenuItem value="copper">Copper</MenuItem>
                      <MenuItem value="creditservices">
                        Credit Services</MenuItem>
                      <MenuItem value="departmentstores">
                        Department Stores</MenuItem>
                      <MenuItem value="diagnosticsresearch">
                        Diagnostics &amp; Research</MenuItem>
                      <MenuItem value="discountstores">
                        Discount Stores</MenuItem>
                      <MenuItem value="drugmanufacturersgeneral">
                        Drug Manufacturers - General</MenuItem>
                      <MenuItem value="drugmanufacturersspecialtygeneric">
                        Drug Manufacturers - Specialty &amp; Generic
                      </MenuItem>
                      <MenuItem value="educationtrainingservices">
                        Education &amp; Training Services</MenuItem>
                      <MenuItem value="electricalequipmentparts">
                        Electrical Equipment &amp; Parts</MenuItem>
                      <MenuItem value="electroniccomponents">
                        Electronic Components</MenuItem>
                      <MenuItem value="electronicgamingmultimedia">
                        Electronic Gaming &amp; Multimedia</MenuItem>
                      <MenuItem value="electronicscomputerdistribution">
                        Electronics &amp; Computer Distribution</MenuItem>
                      <MenuItem value="engineeringconstruction">
                        Engineering &amp; Construction</MenuItem>
                      <MenuItem value="entertainment">
                        Entertainment</MenuItem>
                      <MenuItem value="exchangetradedfund">
                        Exchange Traded Fund</MenuItem>
                      <MenuItem value="farmheavyconstructionmachinery">
                        Farm &amp; Heavy Construction Machinery</MenuItem>
                      <MenuItem value="farmproducts">
                        Farm Products</MenuItem>
                      <MenuItem value="financialconglomerates">
                        Financial Conglomerates</MenuItem>
                      <MenuItem value="financialdatastockexchanges">
                        Financial Data &amp; Stock Exchanges</MenuItem>
                      <MenuItem value="fooddistribution">
                        Food Distribution</MenuItem>
                      <MenuItem value="footwearaccessories">
                        Footwear &amp; Accessories</MenuItem>
                      <MenuItem value="furnishingsfixturesappliances">
                        Furnishings, Fixtures &amp; Appliances</MenuItem>
                      <MenuItem value="gambling">Gambling</MenuItem>
                      <MenuItem value="gold">Gold</MenuItem>
                      <MenuItem value="grocerystores">
                        Grocery Stores</MenuItem>
                      <MenuItem value="healthcareplans">
                        Healthcare Plans</MenuItem>
                      <MenuItem value="healthinformationservices">
                        Health Information Services</MenuItem>
                      <MenuItem value="homeimprovementretail">
                        Home Improvement Retail</MenuItem>
                      <MenuItem value="householdpersonalproducts">
                        Household &amp; Personal Products</MenuItem>
                      <MenuItem value="industrialdistribution">
                        Industrial Distribution</MenuItem>
                      <MenuItem value="informationtechnologyservices">
                        Information Technology Services</MenuItem>
                      <MenuItem value="infrastructureoperations">
                        Infrastructure Operations</MenuItem>
                      <MenuItem value="insurancebrokers">
                        Insurance Brokers</MenuItem>
                      <MenuItem value="insurancediversified">
                        Insurance - Diversified</MenuItem>
                      <MenuItem value="insurancelife">
                        Insurance - Life</MenuItem>
                      <MenuItem value="insurancepropertycasualty">
                        Insurance - Property &amp; Casualty</MenuItem>
                      <MenuItem value="insurancereinsurance">
                        Insurance - Reinsurance</MenuItem>
                      <MenuItem value="insurancespecialty">
                        Insurance - Specialty</MenuItem>
                      <MenuItem value="integratedfreightlogistics">
                        Integrated Freight &amp; Logistics</MenuItem>
                      <MenuItem value="internetcontentinformation">
                        Internet Content &amp; Information</MenuItem>
                      <MenuItem value="internetretail">
                        Internet Retail</MenuItem>
                      <MenuItem value="leisure">Leisure</MenuItem>
                      <MenuItem value="lodging">Lodging</MenuItem>
                      <MenuItem value="lumberwoodproduction">
                        Lumber &amp; Wood Production</MenuItem>
                      <MenuItem value="luxurygoods">
                        Luxury Goods</MenuItem>
                      <MenuItem value="marineshipping">
                        Marine Shipping</MenuItem>
                      <MenuItem value="medicalcarefacilities">
                        Medical Care Facilities</MenuItem>
                      <MenuItem value="medicaldevices">
                        Medical Devices</MenuItem>
                      <MenuItem value="medicaldistribution">
                        Medical Distribution</MenuItem>
                      <MenuItem value="medicalinstrumentssupplies">
                        Medical Instruments &amp; Supplies</MenuItem>
                      <MenuItem value="metalfabrication">
                        Metal Fabrication</MenuItem>
                      <MenuItem value="mortgagefinance">
                        Mortgage Finance</MenuItem>
                      <MenuItem value="oilgasdrilling">
                        Oil &amp; Gas Drilling</MenuItem>
                      <MenuItem value="oilgasep">
                        Oil &amp; Gas E&amp;P</MenuItem>
                      <MenuItem value="oilgasequipmentservices">
                        Oil &amp; Gas Equipment &amp; Services</MenuItem>
                      <MenuItem value="oilgasintegrated">
                        Oil &amp; Gas Integrated</MenuItem>
                      <MenuItem value="oilgasmidstream">
                        Oil &amp; Gas Midstream</MenuItem>
                      <MenuItem value="oilgasrefiningmarketing">
                        Oil &amp; Gas Refining &amp; Marketing</MenuItem>
                      <MenuItem value="otherindustrialmetalsmining">
                        Other Industrial Metals &amp; Mining</MenuItem>
                      <MenuItem value="otherpreciousmetalsmining">
                        Other Precious Metals &amp; Mining</MenuItem>
                      <MenuItem value="packagedfoods">
                        Packaged Foods</MenuItem>
                      <MenuItem value="packagingcontainers">
                        Packaging &amp; Containers</MenuItem>
                      <MenuItem value="paperpaperproducts">
                        Paper &amp; Paper Products</MenuItem>
                      <MenuItem value="personalservices">
                        Personal Services</MenuItem>
                      <MenuItem value="pharmaceuticalretailers">
                        Pharmaceutical Retailers</MenuItem>
                      <MenuItem value="pollutiontreatmentcontrols">
                        Pollution &amp; Treatment Controls</MenuItem>
                      <MenuItem value="publishing">Publishing</MenuItem>
                      <MenuItem value="railroads">Railroads</MenuItem>
                      <MenuItem value="realestatedevelopment">
                        Real Estate - Development</MenuItem>
                      <MenuItem value="realestatediversified">
                        Real Estate - Diversified</MenuItem>
                      <MenuItem value="realestateservices">
                        Real Estate Services</MenuItem>
                      <MenuItem value="recreationalvehicles">
                        Recreational Vehicles</MenuItem>
                      <MenuItem value="reitdiversified">
                        REIT - Diversified</MenuItem>
                      <MenuItem value="reithealthcarefacilities">
                        REIT - Healthcare Facilities</MenuItem>
                      <MenuItem value="reithotelmotel">
                        REIT - Hotel &amp; Motel</MenuItem>
                      <MenuItem value="reitindustrial">
                        REIT - Industrial</MenuItem>
                      <MenuItem value="reitmortgage">
                        REIT - Mortgage</MenuItem>
                      <MenuItem value="reitoffice">REIT - Office</MenuItem>
                      <MenuItem value="reitresidential">
                        REIT - Residential</MenuItem>
                      <MenuItem value="reitretail">REIT - Retail</MenuItem>
                      <MenuItem value="reitspecialty">
                        REIT - Specialty</MenuItem>
                      <MenuItem value="rentalleasingservices">
                        Rental &amp; Leasing Services</MenuItem>
                      <MenuItem value="residentialconstruction">
                        Residential Construction</MenuItem>
                      <MenuItem value="resortscasinos">
                        Resorts &amp; Casinos</MenuItem>
                      <MenuItem value="restaurants">Restaurants</MenuItem>
                      <MenuItem value="scientifictechnicalinstruments">
                        Scientific &amp; Technical Instruments</MenuItem>
                      <MenuItem value="securityprotectionservices">
                        Security &amp; Protection Services</MenuItem>
                      <MenuItem value="semiconductorequipmentmaterials">
                        Semiconductor Equipment &amp; Materials</MenuItem>
                      <MenuItem value="semiconductors">
                        Semiconductors</MenuItem>
                      <MenuItem value="shellcompanies">
                        Shell Companies</MenuItem>
                      <MenuItem value="silver">
                        Silver</MenuItem>
                      <MenuItem value="softwareapplication">
                        Software - Application</MenuItem>
                      <MenuItem value="softwareinfrastructure">
                        Software - Infrastructure</MenuItem>
                      <MenuItem value="solar">Solar</MenuItem>
                      <MenuItem value="specialtybusinessservices">
                        Specialty Business Services</MenuItem>
                      <MenuItem value="specialtychemicals">
                        Specialty Chemicals</MenuItem>
                      <MenuItem value="specialtyindustrialmachinery">
                        Specialty Industrial Machinery</MenuItem>
                      <MenuItem value="specialtyretail">
                        Specialty Retail</MenuItem>
                      <MenuItem value="staffingemploymentservices">
                        Staffing &amp; Employment Services</MenuItem>
                      <MenuItem value="steel">Steel</MenuItem>
                      <MenuItem value="telecomservices">
                        Telecom Services</MenuItem>
                      <MenuItem value="textilemanufacturing">
                        Textile Manufacturing</MenuItem>
                      <MenuItem value="thermalcoal">
                        Thermal Coal</MenuItem>
                      <MenuItem value="tobacco">Tobacco</MenuItem>
                      <MenuItem value="toolsaccessories">
                        Tools &amp; Accessories</MenuItem>
                      <MenuItem value="travelservices">
                        Travel Services</MenuItem>
                      <MenuItem value="trucking">Trucking</MenuItem>
                      <MenuItem value="uranium">Uranium</MenuItem>
                      <MenuItem value="utilitiesdiversified">
                        Utilities - Diversified</MenuItem>
                      <MenuItem value="utilitiesindependentpowerproducers">
                        Utilities - Independent Power Producers</MenuItem>
                      <MenuItem value="utilitiesregulatedelectric">
                        Utilities - Regulated Electric</MenuItem>
                      <MenuItem value="utilitiesregulatedgas">
                        Utilities - Regulated Gas</MenuItem>
                      <MenuItem value="utilitiesregulatedwater">
                        Utilities - Regulated Water</MenuItem>
                      <MenuItem value="utilitiesrenewable">
                        Utilities - Renewable</MenuItem>
                      <MenuItem value="wastemanagement">
                        Waste Management</MenuItem>
                      <MenuItem value="modal">Custom (Elite only)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="pe-label">PE</InputLabel>
                    <Select
                      labelId="pe-label"
                      name="pe"
                      id="pe"
                      form="capform"
                      label='PE'
                      value={pe}
                      onChange={(event) => setpe(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="low">Low (&lt;15)</MenuItem>
                      <MenuItem value="profitable">Profitable (&gt;0)
                      </MenuItem>
                      <MenuItem value="high">High (&gt;50)</MenuItem>
                      <MenuItem value="u5">Under 5</MenuItem>
                      <MenuItem value="u10">Under 10</MenuItem>
                      <MenuItem value="u15">Under 15</MenuItem>
                      <MenuItem value="u20">Under 20</MenuItem>
                      <MenuItem value="u25">Under 25</MenuItem>
                      <MenuItem value="u30">Under 30</MenuItem>
                      <MenuItem value="u35">Under 35</MenuItem>
                      <MenuItem value="u40">Under 40</MenuItem>
                      <MenuItem value="u45">Under 45</MenuItem>
                      <MenuItem value="u50">Under 50</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="volume-label">Volume</InputLabel>
                    <Select
                      labelId="volume-label"
                      name="volume"
                      id="volume"
                      form="capform"
                      label='Volume'
                      value={volume}
                      onChange={(event) => setvolume(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="o400">Over 400K</MenuItem>
                      <MenuItem value="o500">Over 500K</MenuItem>
                      <MenuItem value="o750">Over 750K</MenuItem>
                      <MenuItem value="o1000">Over 1M</MenuItem>
                      <MenuItem value="o2000">Over 2M</MenuItem>
                      <MenuItem value="o5000">Over 5M</MenuItem>
                      <MenuItem value="o10000">Over 10M</MenuItem>
                      <MenuItem value="o20000">Over 20M</MenuItem>
                      <MenuItem value="range">Custom (Elite only)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="pattern-label">Pattern</InputLabel>
                    <Select
                      labelId="pattern-label"
                      name="pattern"
                      id="pattern"
                      form="capform"
                      label='Pattern'
                      value={pattern}
                      onChange={(event) => setpattern(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="horizontal">Horizontal S/R</MenuItem>
                      <MenuItem value="horizontal2">Horizontal S/R (Strong)
                      </MenuItem>
                      <MenuItem value="tlresistance">TL Resistance</MenuItem>
                      <MenuItem value="tlresistance2">TL Resistance (Strong)
                      </MenuItem>
                      <MenuItem value="tlsupport">TL Support</MenuItem>
                      <MenuItem value="tlsupport2">TL Support (Strong)
                      </MenuItem>
                      <MenuItem value="wedgeup">Wedge Up</MenuItem>
                      <MenuItem value="wedgeup2">Wedge Up (Strong)</MenuItem>
                      <MenuItem value="wedgedown">Wedge Down</MenuItem>
                      <MenuItem value="wedgedown2">Wedge Down (Strong)
                      </MenuItem>
                      <MenuItem value="wedgeresistance">Triangle Ascending
                      </MenuItem>
                      <MenuItem value="wedgeresistance2">
                        Triangle Ascending (Strong)</MenuItem>
                      <MenuItem value="wedgesupport">Triangle Descending
                      </MenuItem>
                      <MenuItem value="wedgesupport2">
                        Triangle Descending (Strong)</MenuItem>
                      <MenuItem value="wedge">Wedge</MenuItem>
                      <MenuItem value="wedge2">Wedge (Strong)</MenuItem>
                      <MenuItem value="channelup">Channel Up</MenuItem>
                      <MenuItem value="channelup2">Channel Up (Strong)
                      </MenuItem>
                      <MenuItem value="channeldown">Channel Down</MenuItem>
                      <MenuItem value="channeldown2">Channel Down (Strong)
                      </MenuItem>
                      <MenuItem value="channel">Channel</MenuItem>
                      <MenuItem value="channel2">Channel (Strong)</MenuItem>
                      <MenuItem value="doubletop">Double Top</MenuItem>
                      <MenuItem value="doublebottom">Double Bottom</MenuItem>
                      <MenuItem value="multipletop">Multiple Top</MenuItem>
                      <MenuItem value="multiplebottom">Multiple Bottom
                      </MenuItem>
                      <MenuItem value="headandshoulders">Head &amp; Shoulders
                      </MenuItem>
                      <MenuItem value="headandshouldersinv">
                        Head &amp; Shoulders Inverse</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="floatShort-label">Short Float</InputLabel>
                    <Select
                      labelId="floatShort-label"
                      name="floatShort"
                      id="floatShort"
                      label='Short Float'
                      form="capform"
                      value={floatShort}
                      onChange={(event) => setfloatShort(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="low">Low (&lt;5%)</MenuItem>
                      <MenuItem value="high">High (&gt;20%)</MenuItem>
                      <MenuItem value="u5">Under 5%</MenuItem>
                      <MenuItem value="u10">Under 10%</MenuItem>
                      <MenuItem value="u15">Under 15%</MenuItem>
                      <MenuItem value="u20">Under 20%</MenuItem>
                      <MenuItem value="u25">Under 25%</MenuItem>
                      <MenuItem value="u30">Under 30%</MenuItem>
                      <MenuItem value="o5">Over 5%</MenuItem>
                      <MenuItem value="o10">Over 10%</MenuItem>
                      <MenuItem value="o15">Over 15%</MenuItem>
                      <MenuItem value="o20">Over 20%</MenuItem>
                      <MenuItem value="o25">Over 25%</MenuItem>
                      <MenuItem value="o30">Over 30%</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="rsi-label">RSI</InputLabel>
                    <Select
                      labelId="rsi-label"
                      name="rsi"
                      id="rsi"
                      label='RSI'
                      form="capform"
                      value={rsi}
                      onChange={(event) => setrsi(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="ob90">Overbought (90)</MenuItem>
                      <MenuItem value="ob80">Overbought (80)</MenuItem>
                      <MenuItem value="ob70">Overbought (70)</MenuItem>
                      <MenuItem value="ob60">Overbought (60)</MenuItem>
                      <MenuItem value="os40">Oversold (40)</MenuItem>
                      <MenuItem value="os30">Oversold (30)</MenuItem>
                      <MenuItem value="os20">Oversold (20)</MenuItem>
                      <MenuItem value="os10">Oversold (10)</MenuItem>
                      <MenuItem value="nob60">Not Overbought (&lt;60)
                      </MenuItem>
                      <MenuItem value="nob50">Not Overbought (&lt;50)
                      </MenuItem>
                      <MenuItem value="nos50">Not Oversold (&gt;50)</MenuItem>
                      <MenuItem value="nos40">Not Oversold (&gt;40)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{m: 1, minWidth: 150}}>
                    <InputLabel id="order-label">Order</InputLabel>
                    <Select
                      labelId="order-label"
                      name="order"
                      label='Order'
                      id="order"
                      form="capform"
                      value={order}
                      onChange={(event) => setorder(event.target.value)}
                    >
                      <MenuItem value="any">No Filter</MenuItem>
                      <MenuItem value="o=ticker">Ticker</MenuItem>
                      <MenuItem value="o=company">Company</MenuItem>
                      <MenuItem value="o=sector">Sector</MenuItem>
                      <MenuItem value="o=industry">Industry</MenuItem>
                      <MenuItem value="o=country">Country</MenuItem>
                      <MenuItem value="o=marketcap">Market Cap.</MenuItem>
                      <MenuItem value="o=pe">Price/Earnings</MenuItem>
                      <MenuItem value="o=forwardpe">Forward Price/Earnings
                      </MenuItem>
                      <MenuItem value="o=peg">PEG (Price/Earnings/Growth)
                      </MenuItem>
                      <MenuItem value="o=ps">Price/Sales</MenuItem>
                      <MenuItem value="o=pb">Price/Book</MenuItem>
                      <MenuItem value="o=pc">Price/Cash</MenuItem>
                      <MenuItem value="o=pfcf">Price/Free Cash Flow</MenuItem>
                      <MenuItem value="o=dividendyield">Dividend Yield
                      </MenuItem>
                      <MenuItem value="o=payoutratio">Payout Ratio</MenuItem>
                      <MenuItem value="o=eps">EPS (ttm)</MenuItem>
                      <MenuItem value="o=epsyoy">EPS growth this year
                      </MenuItem>
                      <MenuItem value="o=epsyoy1">EPS growth next year
                      </MenuItem>
                      <MenuItem value="o=eps5years">EPS growth past 5 years
                      </MenuItem>
                      <MenuItem value="o=estltgrowth">EPS growth next 5 years
                      </MenuItem>
                      <MenuItem value="o=sales5years">
                        Sales growth past 5 years</MenuItem>
                      <MenuItem value="o=epsqoq">EPS growth qtr over qtr
                      </MenuItem>
                      <MenuItem value="o=salesqoq">Sales growth qtr over qtr
                      </MenuItem>
                      <MenuItem value="o=sharesoutstanding2">
                        Shares Outstanding</MenuItem>
                      <MenuItem value="o=sharesfloat">Shares Float</MenuItem>
                      <MenuItem value="o=insiderown">Insider Ownership
                      </MenuItem>
                      <MenuItem value="o=insidertrans">Insider Transactions
                      </MenuItem>
                      <MenuItem value="o=instown">Institutional Ownership
                      </MenuItem>
                      <MenuItem value="o=insttrans">
                        Institutional Transactions</MenuItem>
                      <MenuItem value="o=shortinterestshare">
                        Short Interest Share</MenuItem>
                      <MenuItem value="o=shortinterestratio">
                        Short Interest Ratio</MenuItem>
                      <MenuItem value="o=earningsdate">
                        Earnings Date</MenuItem>
                      <MenuItem value="o=roa">Return on Assets</MenuItem>
                      <MenuItem value="o=roe">Return on Equity</MenuItem>
                      <MenuItem value="o=roi">Return on Investment</MenuItem>
                      <MenuItem value="o=curratio">Current Ratio</MenuItem>
                      <MenuItem value="o=quickratio">Quick Ratio</MenuItem>
                      <MenuItem value="o=ltdebteq">LT Debt/Equity</MenuItem>
                      <MenuItem value="o=debteq">Total Debt/Equity</MenuItem>
                      <MenuItem value="o=grossmargin">Gross Margin</MenuItem>
                      <MenuItem value="o=opermargin">
                        Operating Margin</MenuItem>
                      <MenuItem value="o=netmargin">
                        Net Profit Margin</MenuItem>
                      <MenuItem value="o=recom">
                        Analyst Recommendation</MenuItem>
                      <MenuItem value="o=perf1w">Performance (Week)</MenuItem>
                      <MenuItem value="o=perf4w">Performance (Month)</MenuItem>
                      <MenuItem value="o=perf13w">
                        Performance (Quarter)</MenuItem>
                      <MenuItem value="o=perf26w">
                        Performance (Half Year)</MenuItem>
                      <MenuItem value="o=perf52w">Performance (Year)</MenuItem>
                      <MenuItem value="o=perfytd">
                        Performance (Year To Date)</MenuItem>
                      <MenuItem value="o=beta">Beta</MenuItem>
                      <MenuItem value="o=averagetruerange">
                        Average True Range</MenuItem>
                      <MenuItem value="o=volatility1w">
                        Volatility (Week)</MenuItem>
                      <MenuItem value="o=volatility4w">
                        Volatility (Month)</MenuItem>
                      <MenuItem value="o=sma20">
                        20-Day SMA (Relative)</MenuItem>
                      <MenuItem value="o=sma50">
                        50-Day SMA (Relative)</MenuItem>
                      <MenuItem value="o=sma200">
                        200-Day SMA (Relative)</MenuItem>
                      <MenuItem value="o=high50d">
                        50-Day High (Relative)</MenuItem>
                      <MenuItem value="o=low50d">
                        50-Day Low (Relative)</MenuItem>
                      <MenuItem value="o=high52w">
                        52-Week High (Relative)</MenuItem>
                      <MenuItem value="o=low52w">
                        52-Week Low (Relative)</MenuItem>
                      <MenuItem value="o=rsi">
                        Relative Strength Index (14)</MenuItem>
                      <MenuItem value="o=averagevolume">
                        Average Volume (3 Month)</MenuItem>
                      <MenuItem value="o=relativevolume">
                        Relative Volume</MenuItem>
                      <MenuItem value="o=change">Change</MenuItem>
                      <MenuItem value="o=changeopen">
                        Change from Open</MenuItem>
                      <MenuItem value="o=gap">Gap</MenuItem>
                      <MenuItem value="o=volume">Volume</MenuItem>
                      <MenuItem value="o=price">Price</MenuItem>
                      <MenuItem value="o=targetprice">Target Price</MenuItem>
                      <MenuItem value="o=ipodate">IPO Date</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={async () => {
                  fetch('/recomend/screener', {
                    method: 'POST',
                    body: JSON.stringify({
                      'cap': 'cap_'+cap,
                      'exchange': 'exch_'+exchange,
                      'dividend': 'fa_div_'+div,
                      'index': 'idx_'+index,
                      'ind': 'ind_'+ind,
                      'pe': 'fa_pe_'+pe,
                      'volume': 'sh_curvol_'+volume,
                      'floatShort': 'sh_short_'+floatShort,
                      'rsi': 'ta_rsi_'+rsi,
                      'order': order,
                      'pattern': 'ta_pattern_'+pattern,
                    }),
                  } ).then(
                      (res) => res.json(),
                  ).then(
                      (tk) => {
                        const newRows = [];
                        tk.response.map((row) =>
                          newRows.push(createData(row[1],
                              row[2], row[3], row[4], row[5],
                              row[6], row[7], row[8], row[9],
                              row[10])));
                        setRows(newRows);
                        setOpen(false);
                      },
                  );
                }}>Find Recommedation</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
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
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
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

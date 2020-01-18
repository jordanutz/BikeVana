import React, {Component} from 'react'
import './SearchFilter.css'
import {Button, Collapse, Well, Checkbox} from 'react-bootstrap'
import Arrow from './assets/down-arrow.svg'
import Filter from './assets/filter.svg'

class SearchFilter extends Component {
  constructor() {
    super()
    this.state ={
      openBrand: false,
      openCategory: false,
      openGender: false,
      openColor: false,
      openPrice: false,
      openYear: false
    }
  }
  render () {
    return (
      <div className="searchfilter-container">
        <div className="searchfilter-header">
          <h1>Filters</h1>
          <img src={Filter} />
        </div>

        <Button id="filter-buttons" onClick={ () => this.setState({ openBrand: !this.state.openBrand})}>Brand <img src={Arrow} alt="Dropdown Arrow" /> </Button>
        <Collapse in={this.state.openBrand}>
          <div className="brand-filter">
           <Well>
             <div className="flexcolumn-one">
               <Checkbox> <h2>BMC</h2></Checkbox>
               <Checkbox> <h2>Sin Bicycles</h2></Checkbox>
               <Checkbox><h2>Walleräng</h2></Checkbox>
             </div>
           </Well>
         </div>
       </Collapse>

       <Button id="filter-buttons" onClick={ () => this.setState({ openCategory: !this.state.openCategory})}>Category <img src={Arrow} alt="Dropdown Arrow" /> </Button>
       <Collapse in={this.state.openCategory}>
         <div className="brand-filter">
          <Well>
            <div className="flexcolumn-one">
              <Checkbox><h2>Comfort</h2></Checkbox>
              <Checkbox><h2>Commuter</h2></Checkbox>
              <Checkbox><h2>Other</h2></Checkbox>
              <Checkbox><h2>Road</h2></Checkbox>
              <Checkbox><h2>Sport / Performance</h2></Checkbox>
            </div>
          </Well>
        </div>
      </Collapse>

      <Button id="filter-buttons" onClick={ () => this.setState({ openGender: !this.state.openGender})}>Gender <img src={Arrow} alt="Dropdown Arrow" /> </Button>
      <Collapse in={this.state.openGender}>
        <div className="brand-filter">
         <Well>
           <div className="flexcolumn-one">
             <Checkbox> <h2>Female</h2></Checkbox>
             <Checkbox><h2>Male</h2></Checkbox>
             <Checkbox><h2>Not Specified</h2></Checkbox>
           </div>
         </Well>
       </div>
     </Collapse>

     <Button id="filter-buttons" onClick={ () => this.setState({ openColor: !this.state.openColor})}>Color <img src={Arrow} alt="Dropdown Arrow" /> </Button>
     <Collapse in={this.state.openColor}>
       <div className="brand-filter">
        <Well>
          <div className="flexcolumn-one">
            <Checkbox><h2>Black</h2></Checkbox>
            <Checkbox><h2>Blue</h2></Checkbox>
            <Checkbox><h2>Bronze</h2></Checkbox>
            <Checkbox><h2>Pink</h2></Checkbox>
            <Checkbox><h2>Red</h2></Checkbox>
            <Checkbox><h2>White</h2></Checkbox>
          </div>
        </Well>
      </div>
    </Collapse>

    <Button id="filter-buttons" onClick={ () => this.setState({ openPrice: !this.state.openPrice})}>Price <img src={Arrow} alt="Dropdown Arrow" /> </Button>
    <Collapse in={this.state.openPrice}>
      <div className="brand-filter">
       <Well>
         <div className="flexcolumn-one">
           <Checkbox><h2>$0 - $500</h2></Checkbox>
           <Checkbox><h2>$500 - $1000</h2></Checkbox>
           <Checkbox><h2>$1000 - $1500</h2></Checkbox>
           <Checkbox><h2>$1500 - $2000</h2></Checkbox>
          </div>
       </Well>
     </div>
   </Collapse>

   <Button id="filter-buttons" onClick={ () => this.setState({ openYear: !this.state.openYear})}>Year <img src={Arrow} alt="Dropdown Arrow" /> </Button>
   <Collapse in={this.state.openYear}>
     <div className="brand-filter">
      <Well>
        Filter by Year
      </Well>
    </div>
  </Collapse>
      </div>
    )
  }
}

export default SearchFilter

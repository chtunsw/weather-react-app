import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import './CommonStyle.css'
import './StartPage.css'

//redux
import { connect } from 'react-redux'
import { changePageIndex, changeLocationState } from '../actions' 

class StartPage extends React.Component {

    constructor() {
        super();
        this.state = {
            //menu control
            anchorEl: null,
            dialogFlag: false
        };
    }

    handleClick = (e) => {
        //currentTarget:监听onClick的元素
        const clickId = e.currentTarget.id;
        const clickNodeName = e.currentTarget.nodeName
        //change page index
        clickId === 'getWeather' && !this.props.currentLocationState && this.setState({dialogFlag: true})
        clickId === 'getWeather' && this.props.currentLocationState && this.props.changePageIndex({pageIndex:'weatherPage'});
        //handle dialog
        clickId === 'confirm' && this.setState({dialogFlag: false})
        //open menu
        clickId === 'menuButton' && this.setState({ anchorEl: e.currentTarget });
        //change location state and close menu
        clickNodeName === 'LI' && this.props.changeLocationState({locationState: e.currentTarget.innerText})
        && this.setState({ anchorEl: null });
    }

    render() {
        return(
            <div className='backGround'>
                <div className='mainBlock'>
                    <Typography align="center" variant="h2" gutterBottom>Weather Report</Typography>
                    
                    <Button id='menuButton' onClick={this.handleClick} 
                    aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    variant="outlined">
                        <b>select location: {this.props.currentLocationState} </b>
                    </Button>

                    <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClick}>Sydney</MenuItem>
                        <MenuItem onClick={this.handleClick}>Beijing</MenuItem>
                        <MenuItem onClick={this.handleClick}>Moscow</MenuItem>
                        <MenuItem onClick={this.handleClick}>New York</MenuItem>
                    </Menu>

                    <Button id='getWeather' onClick={this.handleClick} variant="contained" color="primary">
                        get weather
                    </Button>

                    <Dialog id='dialogNotice' open={this.state.dialogFlag}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Please select a location.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button id='confirm' onClick={this.handleClick} color="primary">
                            confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentLocationState: state.location.locationState
    }
}

export default connect(mapStateToProps, {changePageIndex, changeLocationState})(StartPage)
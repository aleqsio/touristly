import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import Chip from '@material-ui/core/Chip/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';


const styles = ({
  root: {
    float:"right",
    marginLeft:"auto",
    marginRight:20,
  },
});

class LoginBadge extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.auth);
    this.state = { profile:props.auth.userProfile };
    props.auth.getProfile((err,res)=>{

      this.setState(() => {
        console.log(res);
        return { profile:res };
      });});


  }
render()
{
  if(!this.state.profile) return null;
  return (
    <div className={this.props.classes.root}>
      <Chip  avatar={<Avatar src={this.state.profile.picture}/>} label={<span>Hello {this.state.profile.given_name} </span>} onDelete={()=>this.props.auth.logout()}
             />
    </div>
  )
}
}

export default withStyles(styles)(LoginBadge);
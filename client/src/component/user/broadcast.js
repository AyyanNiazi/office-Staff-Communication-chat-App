import React, {Component,Lazy,Suspense} from 'react';
import {Redirect, BrowserRouter,Route,Switch} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import smsg from '../images/smsg.png'
import down from '../images/down.png'
import gallery from '../images/gallery.png'
import './style/broadcast.css'
import {getChats} from '../../actions/chatAction'
import { connect } from 'react-redux';
import {socket} from '../../container/routing'

 class Broadcast extends Component{


  constructor(Props){
    super(Props);
    this.state={
        message:'',
        data:undefined,
        chats:undefined,
        user:undefined,
        name:'',
        image:undefined,
        file:undefined,
        targeted:false,
        arrow:true,
        enterArrow:true
    }
    
}


  componentDidMount(){
socket.emit("view-chats");
if (this.props.auth.isAuthenticated) {
  console.log("Login Didmount Props", this.props)
this.setState({
  auth: true,
  user: this.props.auth.user
})
}
    
    this.props.getChats();
    if(this.props.chats){
      this.setState({
        chats:this.props.chats,
        targeted:true,
      })
    }
    
     // console.log('Chat data=-=-=-=-=-=',data[0].message)
     
     

 }
 
 onChange(e){
  e.preventDefault();
  this.setState({
    [e.target.name]:e.target.value
})
}
componentWillReceiveProps(nextProps){
  if(nextProps){
    if(nextProps.chats){
      console.log(nextProps.chats)
      
        this.setState({
          chats:nextProps.chats
        })
    }
  }
  // socket.on("get_chats",(data)=>{
  //     console.log('Chat data=-=-=-=-=-=',data[0].message)
  //     if(data){
  //         this.setState({
  //             chats:data
  //         })
  //     }
  // })
}

// onEnter = (e) => {
//   this.setState({
//     enterArrow:false
//   })
//   console.log(e.keyCode)
//   if(e.keyCode == 13 && e.shiftKey == false) {
//     e.preventDefault();
//     // this.myFormRef.submit();
//     var data={
//       name:this.state.user.name,
//       id:this.state.user.id,
//       message:this.state.message,
//       image:this.state.image
//   }
  
//   socket.emit("Chat",data)
//   const rawChat= this.state.chats
//     rawChat.push(data)
//   this.setState({message:'',chats:rawChat})
  // }
// }
onSend=(e)=>{
  e.preventDefault();
console.log('form sy',e.keyCode)
  var data={
      name:this.state.user.name,
      id:this.state.user.id,
      message:this.state.message,
      image:this.state.image
  }
  socket.emit("Chat",data)
  const rawChat= this.state.chats
    rawChat.push(data)
  this.setState({message:'',chats:rawChat})

}
imageOnChange=(e)=>{
  let {image} = this.state;

  // this.setState({image: e.target.value});
  e.preventDefault();
console.log(e.target.files)
  let reader = new FileReader();
  let file = e.target.files[0];
  // images.push(reader.result)
  reader.onloadend = () => {
      // images.push(reader.result)
      // log(image)
    this.setState({
      file: file,
      image: reader.result
    });
  }

  reader.readAsDataURL(file)
}


  imagePicker(){
    this.refs.fileUploader.click()
    this.setState({
        imagePicker: true
    })
}
render(){
  let x = function(){
    if(true){
      console.log(v)
      // console.log(l)
      var v = 10;
      let l= 2;
    }
  }
  console.log(x())
  let splits;
  let inputs;
  // console.log(this.state)
 
  if(!this.state.user){
   return <h1>loading...</h1>
  }
  else{
    const {id,name} = this.state.user
    const {chats} = this.state
    
   return (
     
         <  >
            <div className='row' id='broadcastTop'>
                 {/* <div id='messages' >
                   <div className='row' >
                     <div className='col-12'>
 
                     </div>
                     <div className='col-12'>
 
                     </div>
                   </div> */}
                 {/* </div>                    */}
              <div id='mainBroadcast' >
                
                <div className='row' id='messageScreen'>
                  <div className='col-lg-6' >
                    {/* Reciever Section */}
                     <div id='' >
                      {this.state.chats?
                                 this.state.chats.map((item,index)=>{
                                   splits = item.message.match(/(.{1,25})/g)
                                  //  splits.match(/(.{1,2})/g)
                                  
                                     return(
                                      <div id='messTop' >
                                        {item.id==id?
                                         <div id='sender' className='col-12' >
                                          <p  id='sendtext' >
                                            {splits.map(i => 
                                              { 
                                                return <p  > {i} </p> } )
                                               } 
                                          
                                          </p>
                                            {index===chats.length-1  ? <span id='target' ></span> :void 0  }
                                            {/* { this.state.chats!==undefined  ? index===chats.length-1 ? <span id='target' >  sdf </span> :<p>pehla</p>  : <p>dusra</p> } */}
                                           {/* {this.state.targeted} */}
                                        
                                          </div>
                                       :<div id='receiver'  >
                                          <span  > 
                                         <p style={{fontWeight:600,marginBottom:'0px',marginTop:'20px',textAlign:'left'}} >   
                                          {item.name}
                                          </p>

                                          </span>
                                         <p style={{color:'#fff'}} id='rectext'> 
                                           {splits.map(i => 
                                              { 
                                                return <p  > {i} </p> } )
                                               }
                                          </p>
                                         {index===chats.length-1 ? <span id='target' ></span> :void 0  }                                         
                                         {/* { this.state.chats!==undefined  ? index===chats.length-1 ? <span id='target' >  sdf </span> : <p>pehla</p>  : <p>dusra</p> } */}
                                         {/* {this.props.chats?this.props.chats.length-1 :void 0} */}
                                         {/* {index} */}
                                        </div>
                                       }
                                         {/* { chats.length-1 ? <span id='target' style={{position:'relative',bottom:'0px'}} >  sdf </span> : <p>pehla</p>   } */}
                                      </div>
 
                     )
                   }) 
                  :<h1>Loading...</h1> }
                  
                  {this.state.arrow !== false && (this.state.enterArrow!==false)?
                    <HashLink  smooth to='/user/broadcast#target' onClick={() => {this.setState({ arrow:false })} } >                    
                  <div  id='downArrow'  >
                      <img src={down} width='60' height='60' />  
                  </div>
                    </HashLink>
                    : void 0}
                     </div>
                  </div>   
                </div>
                 <div id='innerBottom' >
                   <div className='row' >                   
                     <div  className= 'col-lg-10 col-xs-8 col-xs-8'  id='inputDiv' >
                       { 
                        inputs = this.state.message.match(/(.{1,5})/g)}
                        {console.log(inputs, 'input k lye')
                        
                       }
                        <input  value={ inputs ? inputs.map((i,ind) => {return inputs[ind] } ) : void 0
                          // inputs? inputs.map(i => {return (<span> {console.log('input k andr sy ,' ,i)} </span>)}) : void 0
                        } name='message' onChange={this.onChange.bind(this)}  
                        type='text' id='textField' placeholder='Start Message' />                     
                         <img  src={gallery} width='30' height='40' id='gallery' onClick={this.imagePicker.bind(this)} />                    
                         <input type='file' style={{display:'none'}} ref="fileUploader"  />
 
                      </div>
                     <div className=' col-lg-2 col-xs-3 col-sm-3' style={{textAlign:'left'}} id='send' >
                      
                       {!this.state.message ? void 0
                       :
                       (<HashLink smooth to='/user/broadcast#target' >     
                          <img  onClick={this.onSend} style={{marginTop:'10px',textAlign:'left',marginLeft:'20px',cursor:'pointer'}} src={smsg} width='40' height='40'  />
                       </HashLink>)
                          }
                     </div>
                   </div>
                 </div>
              </div>
            </div>
         </>
     )
  }
 }
}

const mapStateToProps = (state) => {
  console.log('Current State===>>>',state)
  return{
   chats:state.chatReducer.chat,
   auth:state.auth
  }
}

export default connect(
  mapStateToProps,{getChats}
)(Broadcast)
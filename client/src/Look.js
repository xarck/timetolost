import React, { Component } from 'react'
import axios from 'axios'
import { Alert ,Button,Input,  Modal, ModalHeader, ModalBody,Form,FormGroup, ModalFooter } from 'reactstrap'
import './App.css'

class Look extends Component{
    state = {
        email: '',
        modal: false,
        urltext:'',
        data: [],
        link: ['songs','apps','videos','websites','webpages','images','movies','albums','books','games','softwares'],
        text: ['facts','thoughts','jokes'],
        maintext: 'Click On Get It Button To Reach The Respective Content. \n If You Click On Jokes, Thoughts Or Facts Column Then There Content Will Be Placed Here.',
        background : {background: "linear-gradient(to right, #38ef7d, #11998e)"},
        name: 'Quepal',
        visitor: null
    }

    changeTheme = ()=>{
        const theme = ['linear-gradient(to right, #00c6ff, #0072ff)','linear-gradient(to right, #fe8c00, #f83600)','linear-gradient(to right, #485563, #29323c)','linear-gradient(to right, #6441a5, #2a0845)','linear-gradient(to right, #8e0e00, #1f1c18)','linear-gradient(to right, #ffb75e, #ed8f03)','linear-gradient(to right, #6a3093, #a044ff)','linear-gradient(to right, #fd746c, #ff9068)','linear-gradient(to right, #834d9b, #d04ed6)','linear-gradient(to right, #16bffd, #cb3066)','linear-gradient(to right, #ff4b1f, #ff9068)','linear-gradient(to right, #3a7bd5, #3a6073)','linear-gradient(to right, #f00000, #dc281e)','linear-gradient(to right, #42275a, #734b6d)','linear-gradient(to right, #000428, #004e92)','linear-gradient(to right, #56ab2f, #a8e063)','linear-gradient(to right, #cb2d3e, #ef473a)','linear-gradient(to right, #ee9ca7, #ffdde1)','linear-gradient(to right, #2193b0, #6dd5ed)','linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)','linear-gradient(to right, #0f2027, #203a43, #2c5364)','linear-gradient(to right, #ff0099, #493240)']
        var name = ['Facebook Messenger','SoundCloud','ServQuick','Twitch','Netflix','Light Orange','Purplin','Haikus','Suzy','Transfile','Sylvia','Solid Vault','Minimal Red','Mauve','Frost','Lush','Firewatch','Piggy Ping','Cool Blues','MegaTron','Moonlit Asteroid','Yoda']
        const index= Math.floor(Math.random()*theme.length)
        const value = theme[index]
        const nameValue = name[index]
        this.setState({background: {background: value}, name: nameValue})
    }

    componentDidMount(){
        axios.get('/api/content')
        .then(data => this.setState({data:data.data[0]}))

        axios.get("https://api.countapi.xyz/hit/timetolost/visits")
        .then(data=> this.setState({visitor:data.data.value}))
    }

    toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    handleurltext = (e) => {
        var element = e.target.parentElement.parentElement.id
        Object.keys(this.state.data["contents"]).forEach(cont => {
                if(cont === element){
                var array = this.state.data["contents"][cont]
                var index = Math.floor(Math.random()*array.length)
                var value = array[index]
                this.setState({urltext: "http://" + value})
                }
            })
      }

    handlemaintext = (e) =>{
        var element = e.target.parentElement.id
        Object.keys(this.state.data["contents"]).forEach(cont => {
                if(cont === element){
                var array = this.state.data["contents"][cont]
                var index = Math.floor(Math.random()*array.length)
                var value = array[index]
                this.setState({maintext: value})
                }
        })
    }

    handleEmail= (e) => {
        e.preventDefault()
        if(e.target.previousSibling.value !==""){
            this.setState({email: e.target.previousSibling.value},()=>{
            axios.post('/api/content/email',{
            email: this.state.email
        })
        this.toggle()
        })  
        }else{
            var alert = e.target.nextElementSibling.nextElementSibling
            alert.style.display = 'block'
            this.setState({message: 'Email Can\'t Be Empty'})
        }
        e.target.previousSibling.value = ''
    }
    handleSponser = (e) => {
        var array = this.state.data["contents"]["sponsers"]
        var index = Math.floor(Math.random()*array.length)
        var value = array[index]
        this.setState({urltext: "http://" + value})
    }

    render(){   
            const Link = this.state.link.map(type=>{
                return(
                    <li id={type} style={this.state.background}>
                    <img src={require(`./icon/${type}.png`)} alt="" /><br />
                    <span>{type}</span><br/>
                    <a  id={`${type}-content`} onClick={this.handleurltext} href={this.state.urltext} ><Button color='primary'>Get it</Button></a>
                    <a  id={`${type}-sponser`} className='sponsers' onClick={this.handleSponser} href={this.state.urltext}><Button color='danger'>Sponsers</Button></a>
                    </li>
                )
            })
            const Text = this.state.text.map(type=>{
                return(
                    <li id={type} style={this.state.background}>
                        <img src={require(`./icon/${type}.png`)} alt=""/><br/>
                        <span>{type}</span><br/>
                        <Button  onClick={this.handlemaintext} color='primary'>Get It</Button>
                    </li>
                )
            })

    return (
        <div>   
            <header>
                <h1 id='logo'>TIME TO LOST</h1> 
                <Button color='success' onClick={this.changeTheme} id='btn-theme'>Theme</Button>
            </header>
            
            <nav>
                <ul className='divider'>
                <li id="content" ><p>{this.state.maintext}</p></li>
                {Link}
                {Text}
                </ul>
            </nav>
            
            <footer>
                <div>
                    <br />
                    &copy; 2020 under dimensions  inc. <br/>
                    Font-Used: Monseratte <br/>
                    <a href='https://www.uigradients.com'>theme-used</a>: {this.state.name} <br/>
                    <a href='https://www.flaticon.com'>icons-used</a>: Flaticons <br />
                    visitors: {this.state.visitor}
                </div>
                <div>
                    <Button color="primary" onClick={this.toggle} id='support'>Contact Us</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <p>For Sponsering / Collaborating / Suggestions</p>
                                <Input bssize="lg"  type='email' placeholder='Enter Your Email Here' />
                                <Button  color="primary" onClick={this.handleEmail}>Submit</Button><br />
                                <Alert>{this.state.message}</Alert>
                            </FormGroup> 
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                </div>
                <div id='main-credits'>
                    credits: Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank"  rel="noopener noreferrer">CC 3.0 BY</a><br/>
                </div>
            </footer>
    </div>

    )
}
}
   
export default Look
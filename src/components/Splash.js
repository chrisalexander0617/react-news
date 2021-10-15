import React, {Component} from 'react';
import axios from 'axios';

import Search from './Search';
import Feed from './Feed';
import LoadBox from './LoadBox';
import ArticleCard from './ArticleCard';
import StatusCard from './StatusCard';

class Splash extends Component {
    constructor(){
        super();
        this.state = {
            isLoaded:null,
            articles:null,
            query:'',
            time:null,
            serverStatus:null
        }

        this.search = this.search.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:8080/')
        .then(res =>{
            this.setState({serverStatus:'Connected' });
        })
        this.tick();
    }

    
    tick(){
        setInterval(() => {
            var hours = new Date().getHours();
            var minutes = new Date().getMinutes();
            var seconds = new Date().getSeconds();

            var meridiem;
    
            if(hours > 12 ) {
                hours = hours - 12
                meridiem = 'pm'
            } 
            
            else {
                meridiem = 'am'
            }
            
            if(hours < 10) hours = '0' + hours;
            if(seconds < 10) seconds = '0' + seconds;
            if(minutes < 10) minutes = '0' + minutes;
            
            var timeFormatted =  hours + ":" + minutes + " " + meridiem
            this.setState({ time:timeFormatted });

        }, 1000)
    }
    
    handleKeyPress(e) {
        if(e.key === 'Enter'){
            this.setState({isLoaded:false });

            var data = {
                data:this.state.query
            };

            axios
            .get('http://localhost:8080/search/', { params:data} )
            .then(data => {
                this.setState({
                    articles:data.data[0].articles,
                    isLoaded:true
                })
            })
            .catch(err => console.log(err))
        } else return;
    }

    search(){
        this.setState({isLoaded:false });
        var data = { data:this.state.query }
        axios
        .get('http://localhost:8080/search/', { params:data} )
        .then(res => {
            this.setState({
                articles:res.data[0].articles,
                isLoaded:true
            })
        })
        .catch(err => console.log(err))
    }

    handleTextChange = e => this.setState({query:e.target.value}) 

    render(){
        var articleCards = [];
        if(this.state.articles){

            this.state.articles.forEach((article, i) =>{
                if(i >= 9) return;

                if(article.media == null){
                    return
                } 
                
                else {
                    articleCards.push(
                        <ArticleCard 
                            key={i} 
                            link={article.link} 
                            title={article.title} 
                            preview={article.summary} 
                            topic={article.topic} 
                            img={article.media} 
                        />
                    )
                }
            })
        }
       
        return (
            <>
                <div className="splash">
                    { 
                        this.state.serverStatus && <StatusCard status={this.state.serverStatus} />
                    }
                    <div className="container mb-10 mx-auto">

                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-3 text-gray-600">Currently</h1>
                                <p className="text-gray-400 mb-5">Your news app</p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-3 text-gray-600">{this.state.time }</div>
                            </div>
                        </div>
               
                        <Search 
                            value={this.state.searchValue}
                            handleClick={this.search}
                            handleChange={ (e) => { this.handleTextChange(e) } } 
                            handleKeyPress={this.handleKeyPress}
                        />

                    </div>
                    <div className="container mx-auto my-10">
                        { 
                            this.state.isLoaded === false ?
                            <LoadBox /> : <Feed articleCards={articleCards} /> 
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Splash;
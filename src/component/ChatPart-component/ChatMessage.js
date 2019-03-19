import React, { Component } from 'react'
import './message.css';
import disImg from './img/images.png'
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
// var Caller = require('../../utility/callFunction');
import * as Caller from '../../utility/callFunction';

class ChatMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texts: '',
            isLeft: 'false',
            time: '',
            clientID: '',
            clientName: '1',
            clientImg: '',
            groupName: '12345',
            // data: [{ clientName: 'mild', clientImg: disImg, isLeft: 'true', time: '11.11', texts: 'left test' },
            // { clientName: 'mild', clientImg: disImg, isLeft: 'true', time: '11.11', texts: 'left test' },
            // { clientName: 'mon', clientImg: disImg, isLeft: 'false', time: '11.11', texts: 'right test' },
            // { clientName: 'mild', clientImg: disImg, isLeft: 'true', time: '11.11', texts: 'left test' },
            // { clientName: 'mon', clientImg: disImg, isLeft: 'false', time: '11.11', texts: 'right test' },
            // { clientName: 'mon', clientImg: disImg, isLeft: 'false', time: '11.11', texts: 'right test' },
            // { clientName: 'mild', clientImg: disImg, isLeft: 'true', time: '11.11', texts: 'left test' }],
            data: [],
            loading: false,
            hasMore: true,
        }
    }

    async componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight);

        let message = await Caller.getMessage(this.state.clientName, this.state.groupName)
        console.log('message', message)

        this.setState({
            data: message
        });
        // this.fetchData((res) => {
        //     this.setState({
        //         data: res.results,
        //     });
        // });
        // this.setState({data:[...data,data]})
    }

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            // message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
    }
    render() {
        return (
            <div className="message-part">
                <div className="demo-infinite-container" style={{ overflow: 'auto' }}>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            renderItem={item => (
                                <div>
                                    {item.isLeft == "true" && (
                                        <div>
                                            <div className="single-message">
                                                <div className='image-cropper'>
                                                    <img src={item.clientImg} ></img>
                                                </div>
                                                <div style={{ margin: "10px", color: "grey" }}>{item.clientName}</div>
                                                <div style={{ margin: "10px", color: "lightGray" }}>{item.time}</div>
                                            </div>
                                            <div className="talk-bubble-left tri-right round btm-left">
                                                <div className="talktext-left">
                                                    <p>{item.texts}</p>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                    {item.isLeft == "false" && (
                                        <div>
                                            < div className="talk-bubble-right tri-right round btm-right" >
                                                <div className="talktext-right">
                                                    <p>{item.texts}</p>
                                                </div>
                                            </div >
                                            <div style={{ marginRight: "20px", color: "lightGray", textAlign: "right" }}>{item.time}</div>
                                        </div>
                                    )
                                    }
                                </div>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default ChatMessage
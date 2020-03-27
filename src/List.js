import React from "react";


class List extends React.Component {
    constructor() {
        super();

        this.state = {
            list: '',
            loader: true

        }
        
    }

    componentDidMount() {

        const https = require('https');

        https.get('https://asiointi.hel.fi/palautews/rest/v1/requests.json?&status=open', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                this.setState({
                    list: JSON.parse(data),
                });

                console.log(this.state.list);

                this.setState({
                    loader: false
                });
            
            });


        }).on('error', (err) => {
            console.log("Error: " + err.message);
        });
        
    }


    render() {

        if (this.state.loader === false) {
            return (
                <div>
                    <ul className="list-group">
                        
                        {this.state.list.map((list) => {
                            return (
                            <li className="list-group-item" key={list.service_request_id}>
                                <div>
                                    <p>Huolto pyyntö id: {list.service_request_id} <br></br>
                                    Huolto numero: {list.service_code} <br></br>
                                    Huollon nimi: {list.service_name} <br></br>
                                    Vastuu ryhmä: {list.agency_responsible} <br></br>
                                    Huollon kuvaus: {list.description}</p>
                                </div>
                            </li>
                            )
                        
                        })}
                        
                    </ul>

                </div>
            );
        }
        else {
            return(
                <p>No service requests</p>
            )
        }
    }
}


export default List;
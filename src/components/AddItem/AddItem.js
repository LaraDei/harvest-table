import React, {Component} from 'react'
import Context from '../../Context'
import ListingApiService from '../../services/listings-api-service'
import config from '../../config'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  }from 'react-places-autocomplete'
import TokenService from '../../services/token-service'
import HTForm from '../HTForm/HTform'
import './AddItem.css'
import logo from '../../img/Untitled.png'

export default class AddItem extends Component{
    constructor(props){
        super(props)
        this.state={
            title: '',
            address: '',
            lat: 0,
            lng: 0,
            img_location:'',
            error: null
        }
    }

    static defaultProps ={
        history: {
            push: () => {},
            goBack: () => { }
          },
    }

    static contextType = Context
    //collect required data before photo submit
    handleChange = address => {
        this.setState({ error: null });
        this.setState({ address });
    };
    updateValue= (value, key) => {
        this.setState({ [key]: value})
    };

    validateCaption= () => {
        const caption = this.state.caption.value.trim();
        if (caption.length === 0) {
            this.setState({ [caption]: {error : "Please enter a photo caption" }})
        }
    }
     
      handleSelect = address => {
        this.setState({ address })
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(({ lat, lng }) =>{
            this.setState({lat: lat, lng: lng})
          })
          .catch(error => console.error('Error', error));
      };

      // post new photo to API
    handleListingSubmit= e => {
        e.preventDefault()
        if(!this.state.lat){
            this.setState({error: "you must select address from drop down menu"})
            return
        }
        const formData  = new FormData();
        formData.append('img_location', this.state.img_location);
        formData.append('title', this.state.title);
        formData.append('location', this.state.address);
        formData.append('description', this.state.description);
        formData.append('lat', this.state.lat);
        formData.append('lng', this.state.lng);

        ListingApiService.postListing(formData )
        .then(resListing => {
        this.context.addItem(resListing)
        this.props.history.push(`/user/${window.localStorage.getItem(config.USER_ID)}`) 
        })
        .catch(res => {
            this.setState({ error: `Upload error. Please check file type of upload: ${res.error.message}`  })
        })
    }
  
   fileUpload = e => {
    this.setState({
        img_location: e.target.files[0]
    })
}
    render(){
        const { error } = this.state
        return(
            <div className='AddItem'>
                <section className="regError" role='alert'>{error}</section>
                {!TokenService.hasAuthToken()
                    ? <p>* You must be logged in to post listings</p>
                    : 
                    <HTForm className='add-item-form' onSubmit={this.handleListingSubmit}>
                        <div>
                            <h4 className="HTLogo" ><img src={logo} alt="lemon logo" style={{width:"40px", height:"40px"}}/>Harvest Table</h4>
                            <h2>Create Listing</h2>
                        </div>
                        <div>
                            <label id='title' htmlFor='title'>Name: </label>
                            <input aria-labelledby="title" type='text' name='title' onChange={e => this.updateValue(e.target.value, e.target.name)} placeholder='name of produce*' required></input>
                        </div>
                        <div>
                            <label id="description"htmlFor='description'>Description: <span style={{float:"right", fontSize:"smaller"}}>(optional)</span></label>
                            <input aria-labelledby="description" type='text' name='description' onChange={e => this.updateValue(e.target.value, e.target.name)} placeholder='additional information'></input>
                        </div>
                        <div>
                            <label id="imgLabel" htmlFor='image'>Image: <span style={{float:"right", fontSize:"smaller"}}>(must be JPEG or PNG)</span></label>
                            <input aria-labelledby="imgLabel" className="file-upload" type='file' name='image' id='image' onChange={(e) => this.fileUpload(e)} required></input>
                        </div>
                        <div className='search-location'>
                        {window.google && (
                            <PlacesAutocomplete
                                value={this.state.address}
                                onChange={this.handleChange}
                                onSelect={this.handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <label id="location" htmlFor='location'>Location: </label>
                                    <input required aria-labelledby="location" name='location'
                                    {...getInputProps({
                                        placeholder: 'Type address *',
                                        className: 'location-search-input',
                                    })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';

                                        return (
                                        <div key={suggestions.indexOf(suggestion)}
                                            {...getSuggestionItemProps(suggestion, {
                                            className, 
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                )}
                            </PlacesAutocomplete>
                        )}
                        </div>
                        <button className='submitBtn' type="submit">Submit</button>
                    </HTForm>
            }
            </div>
        )
    }
}


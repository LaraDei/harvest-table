import React, {Component} from 'react'
import Context from '../../Context'
import ListingApiService from '../../services/listings-api-service'
import config from '../../config'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  }from 'react-places-autocomplete'
import TokenService from '../../services/token-service'


export default class AddItem extends Component{
    constructor(props){
        super(props)
        this.state={
            title: '',
            address: '',
            lat: 0,
            lng: 0,
            img_location:''
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
            // console.log('Successfully got latitude and longitude', { lat, lng })
          })
          .catch(error => console.error('Error', error));
      };

      // post new photo to API
    handleListingSubmit= e => {
        e.preventDefault()
        
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
        
        .catch(error => {
        console.error('add Listing ',{ error })
        })
    }
  
   fileUpload = e => {
    this.setState({
        img_location: e.target.files[0]
    })
}
    render(){
        return(
            <div className='AddItem'>
                <h2>Create a new Listing</h2>
                <section className="regError" role='alert'></section>
                {!TokenService.hasAuthToken()
                    ? <p>* You must be logged in to post listings</p>
                    : 
                    <form className='add-item-form' onSubmit={this.handleListingSubmit}>
                        <p>*required</p>
                        <div>
                            <label htmlFor='title'>Name</label>
                            <input type='text' name='title' onChange={e => this.updateValue(e.target.value, e.target.name)} placeholder='Kale' required></input>
                        </div>
                        <div>
                            <label htmlFor='description'>Description:</label>
                            <input type='text' name='description' onChange={e => this.updateValue(e.target.value, e.target.name)} placeholder='located in basket by mailbox'></input>
                        </div>
                        <div>
                            <label id="imgLabel" htmlFor='image'>Image:</label>
                            <input type='file' name='image' id='image' onChange={(e) => this.fileUpload(e)} ></input>
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
                                    <input name='location'
                                    {...getInputProps({
                                        placeholder: 'Type address ...',
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
                    </form>
            }
            </div>
        )
    }
}


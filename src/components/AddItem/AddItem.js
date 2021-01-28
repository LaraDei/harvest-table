import React, {Component} from 'react'
import Context from '../../Context'
import ListingApiService from '../../services/listings-api-service'
// import LocationSearchInput from './searchItem'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  }from 'react-places-autocomplete'


export default class AddItem extends Component{
    constructor(props){
        super(props)
        this.state={
            title: '',
            location: '',
            address: '',
            date_created:'',
            lat: 0,
            lsn: 0,
            formTouched: false,
        }
    }

    static defaultProps ={
        history: {
            push: () => {}
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
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(({ lat, lng }) =>{
            this.setState({lat: lat, lng: lng})
            console.log('Successfully got latitude and longitude', { lat, lng })
          })
          .catch(error => console.error('Error', error));
      };

      // post new photo to API
    handleListingSubmit= url => {
        ListingApiService.postListing({
            title: this.state.title, 
            description: this.state.description,
            img_location: url,
            location: this.state.location,
            lat: this.state.lat,
            lng: this.state.lng
        })
        .then(resListing => {
        this.context.addListing(resListing)
        this.props.history.push('/search')
        
        })
        .catch(error => {
        console.error('add Listing ',{ error })
        })
    }
  
   fileUpload = e => {
    this.setState({
        selectedFile: e.target.files[0]
    })
}
    render(){
        console.log(this.state.address)
        console.log(this.state)
        return(
            <div className='AddItem'>
                <h2>Create a new Listing</h2>
                <p>*required</p>
                <section className="regError" role='alert'>

                </section>
                <form className='add-item-form'>
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
                        <input type='file' name='image' id='image' onChange={(e) => this.fileUpload(e)} required></input>
                    </div>
                    <div className='search-location'>
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
                    </div>
                </form>
            </div>
        )
    }
}

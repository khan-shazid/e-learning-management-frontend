export const columns = [{
  dataField: 'id',
  text: '#'
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'address',
    text: 'Address'
  }, {
    dataField: 'city',
    text: 'City'
  }, {
    dataField: 'state',
    text: 'State'
  }, {
    dataField: 'zipCode',
    text: 'Zip Code'
  }, {
    dataField: 'county',
    text: 'County'
  }, {
    dataField: 'phone',
    text: 'Phone'
  }, {
    dataField: 'type',
    text: 'Type'
  }, {
    dataField: 'capacity',
    text: 'Capacity'
  }];

export const fixedHeaders = [
              'name','address','city','state','zipCode','county','phone','type','capacity'
          ];

export const BASE_URL = "http://ec2-3-14-141-240.us-east-2.compute.amazonaws.com/api/";

export const LOADER_STYLE = "Audio";

// "proxy": "http://ec2-3-14-141-240.us-east-2.compute.amazonaws.com/",

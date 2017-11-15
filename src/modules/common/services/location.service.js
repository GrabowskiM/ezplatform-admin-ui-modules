import {
    handleRequestResponse,
    ENDPOINT_VIEWS,
    HEADERS_VIEWS
} from './common.service';

export const loadLocation = (locationId = 2, limit = 10, offset = 0, callback) => {
    const body = JSON.stringify({
        ViewInput: {
            identifier: `subitems-load-location-${locationId}`,
            public: false,
            LocationQuery: {
                Criteria: {},
                FacetBuilders: {},
                SortClauses: {LocationPriority: 'ascending'},
                Filter: {ParentLocationIdCriterion: locationId},
                limit,
                offset
            }
        }
    });

    const request = new Request(ENDPOINT_VIEWS, {
        method: 'POST',
        headers: HEADERS_VIEWS,
        body,
        mode: 'cors',
    });

    fetch(request)
        .then(handleRequestResponse)
        .then(callback)
        .catch(error => console.log('error:load:location', error));
};

export const findLocationsByParentLocationId = (parentLocationId, callback) => {
    const body = JSON.stringify({
        ViewInput: {
            identifier: `udw-locations-by-parent-location-id-${parentLocationId}`,
            public: false,
            LocationQuery: {
                Criteria: {},
                FacetBuilders: {},
                SortClauses: {SectionIdentifier: 'ascending'},
                Filter: {ParentLocationIdCriterion: parentLocationId},
                limit: 50,
                offset: 0
            }
        }
    });

    const request = new Request(ENDPOINT_VIEWS, {
        method: 'POST',
        headers: HEADERS_VIEWS,
        body,
        mode: 'cors',
    });

    fetch(request)
        .then(handleRequestResponse)
        .then(json => callback({
            parentLocationId,
            data: json
        }))
        .catch(error => console.log('error:find:locations:by:parent:location:id', error));
};

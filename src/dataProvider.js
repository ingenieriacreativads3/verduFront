import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const httpClient = (url, options = {}) => {
  // if (!options.headers) {
  //     options.headers = new Headers({ Accept: 'application/json' });
  // }
  // add your own headers here

  options.headers = new Headers()

  options.headers.set('Content-Type', 'application/json');
  options.headers.set('Authorization', localStorage.getItem('session_token'));
  options.headers.set('session', localStorage.getItem('session_id'));
  return fetchUtils.fetchJson(url, options);
}

// const apiUrl = 'http://localhost:303'
const apiUrl = 'https://murmuring-dawn-90366.herokuapp.com'
// const apiUrl = 'https://jsonplaceholder.typicode.com';

export default {

  getList: (resource, params) => {

    console.log(params)
    console.log(resource)

    let project = {}

    let match = {
      operationType : { $ne: "D" },
    }

    let sort = {}
    let group = {}
    let limit = params.pagination.perPage
    let skip = 0


    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
    };
    const url = apiUrl + '/' + resource + '?project=%7B%7D&match=%7B%22operationType%22:%7B%22$ne%22:%22D%22%7D%7D&sort=%7B%7D&group=%7B%7D&limit=' + limit + '&skip=0';

    // const url = 'http://localhost:303/bank?project=%7B%22name%22:1,%22updateDate%22:%7B%22$dateToString%22:%7B%22date%22:%22$updateDate%22,%22format%22:%22%25d/%25m/%25Y%22,%22timezone%22:%22-03:00%22%7D%7D,%22operationType%22:1,%22creationUser._id%22:1,%22creationUser.email%22:1,%22updateUser._id%22:1,%22updateUser.email%22:1%7D&match=%7B%22operationType%22:%7B%22$ne%22:%22D%22%7D%7D&sort=%7B%22name%22:1%7D&group=%7B%7D&limit=10&skip=0'

    // return httpClient(url).then(({ headers, json }) => ({
    //   data: json,
    //   total: parseInt(headers.get('content-range').split('/').pop(), 10),
    // }));

    return httpClient(url).then(response => {

      let result = response.json.result

      console.log(result)

      result.map(item => {
        item.id = item._id
      })

      return {
        data: result,
        total: response.json.result.length
      }
    })
  },

    getOne: (resource, params) => {

      console.log(resource)
      console.log(params)

      return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
        data: json,
      }))
    },

    getMany: (resource, params) => {

      // console.log(resource)
      // console.log(params)

      let project = {}

      let match = {
        _id: {
          $oid: params.ids[0]
        }
      }

      let sort = {}
      let group = {}
      let limit = 0
      let skip = 0

      // params.ids.map(id => {
      //   match._id.$in.push({
      //     $oid: id
      //   })
      // })

      // console.log(match)

      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      const url = `${apiUrl}/${resource}`;
      return httpClient(url).then((response) => {

        let result = []

        response.json.result.map(item => {
          item.id = item._id
          result.push(item)
        })

        return {
          data: result
        }
      });
    },

    getManyReference: (resource, params) => {

      console.log(resource)
      console.log(params)

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {

        params.ids.map(id => {
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: 'DELETE',
          }) 
        })

        return {
          data: {}
        }
    },
};
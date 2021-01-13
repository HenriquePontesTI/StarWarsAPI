import api from '../api';

export default class BaseController {
    constructor(root, entity) {
        this.routes = [{
                route: '',
                method: 'get',
                action: 'get'
            },
            {
                route: '/:id',
                method: 'getById',
                action: 'get'
            },
            {
                route: '',
                method: 'create',
                action: 'post'
            },
            {
                route: '/:id',
                method: 'update',
                action: 'put'
            },
            {
                route: '/:id',
                method: 'remove',
                action: 'delete'
            }
        ];

        this.root = root;
        this.entity = entity;
    }

    get(request, response) {
        return this.entity.find({})
            .then(items => response.send(items))
            .catch(err => response.status(400).send(err.message));
    }

    getById(request, response) {
        const {
            params: {
                id
            }
        } = request;

        return this.entity.find({
                _id: id
            })
            .then(items => response.send(items))
            .catch(err => response.status(400).send(err.message));
    }

    create(request, response) {
        let films = 0;
        let item = new this.entity(request.body);


        return api.get('/planets').then(response => {
                films = response.data.results.find(planets => planets.name == request.body.nome).films.length;
                item.filmes = films;
            }).then(() => item.save()).then(() => response.status(201).send(response.json({
                results: item
            }), item))
            .catch(err => response.status(422).send(err.message));

    }

    update(request, response) {
        return this.entity.findOneAndUpdate({
                _id: request.params.id
            }, request.body)
            .then(() => response.sendStatus(200))
            .catch(err => response.status(422).send(err.message));
    }

    remove(request, response) {
        return this.entity.remove({
                _id: request.params.id
            })
            .then(() => response.sendStatus(204))
            .catch(err => response.status(400).send(err.message));
    }
}
import Planet from '../../../src/models/planet';

describe('Routes: Planets', () => {
  let request;

  before(()=> {
    return setupApp()
      .then(app => {
        request = supertest(app)
      });
  });

  const defaultId = '5fff32b12baf855e888035ec';
  const defaultPlanet = {
    nome: 'Naboo',
    clima: 'temperado',
    terreno: 'florestas, montanhas, lagos',
    filmes: 5
  };
  const expectedPlanet = {
    __v: 0,
    _id: defaultId,
    nome: 'Naboo',
    clima: 'temperado',
    terreno: 'florestas, montanhas, lagos',
    filmes: 5
  }

  beforeEach(() => {
    const planet = new Planet(defaultPlanet);
    planet._id = '5fff32b12baf855e888035ec';
    return Planet.remove({})
      .then(() => planet.save());
  });

  afterEach(() => Planet.remove({}));

  describe('GET /planets', () => {
    it("Retornar a lista de Planetas", done => {
      request.get("/api/planets").end((err, res) => {
        expect(res.body).to.eql([expectedPlanet]);
        done(err);
      });
    });

    context("Encontrar um determinado Id", done => {
      it("Retornar 200 com o planeta", done => {
        request.get(`/api/planets/${defaultId}`).end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql([expectedPlanet]);
          done(err);
        });
      });
    });
  });

  describe('POST /planets', () => {
    context("Adicionar um Planeta", () => {
      it("Retornar o novo Planeta com status 200", done => {
        const customId = "56cb91bdc3464f14678934ba";
        const newPlanet = Object.assign({}, { _id: customId, __v: 0 }, defaultPlanet);
        const expectedSavedPlanet = {
          __v: 0,
          _id: customId,
          nome: 'Naboo',
          clima: 'temperado',
          terreno: 'florestas, montanhas, lagos'
        };

        request
          .post("/api/planets")
          .send(newPlanet)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedPlanet);
            done(err);
          });
      });
    });
  });

  describe('PUT /planets/:id', () => {
    context("Atualizar um Planeta", () => {
      it("Atualizar o Planeta e retornar o status 200", done => {
        const customPlanet = { nome: "Planeta Teste Atualizado" };
        const updatedPlanet = Object.assign({}, customPlanet, defaultPlanet);

        request
          .put(`/api/planets/${defaultId}`)
          .send(updatedPlanet)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe('DELETE /planets/:id', () => {
    context("Excluir um Planeta", () => {
      it("Excluir o Planeta e retornar status 204", done => {
        request.delete(`/api/planets/${defaultId}`).end((err, res) => {
          expect(res.status).to.eql(204);
          done(err);
        });
      });
    });
  });
});

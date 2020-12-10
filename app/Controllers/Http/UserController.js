'use strict'

const User = use('App/Models/User')
class UserController {

    async create({ request, response, params }) {

        try {
            const dados = request.only(['username', 'email', 'password']);
            const user = await User.create(dados);

            return user

        } catch (err) {
            return response.status(404).send({ message: 'Já existe o email cadastrado!' })
        }
    }

    async login({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token
    }

    async read({ request, response, params }) {
        const dados = await User.all()

        if (!dados) {
            return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
        }
        return dados
    }

    async readById({ request, response, params }) {
        const dados = await User.query().where('id', params.id).fetch()

        if (!dados) {
            return response.status(404).send({ message: 'Id não encontrado!' })
        }
        return dados
    }

    async update({ request, response, params }) {
        const { username, email, password } = request.all()

        const dados = await User.query().where('id', params.id).first();

        if (!dados) {
            return response.status(404).send({ message: 'Dados não encontrados!' })
        }

        dados.username = username;
        dados.email = email;
        dados.password = password;
        dados.id = params.id;

        await dados.save()
        return dados
    }

    async delete({ request, response, params }) {

        const dados = await User.query().where('id', params.id).first();

        if (!dados) {
            return response.status(404).send({ message: 'Dados não encontrado' })
        }


        await dados.delete();

        return response.status(200).send({ message: 'Dados Excluidos', dados })
    }
}

module.exports = UserController
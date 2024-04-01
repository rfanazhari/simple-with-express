const toDomainUser = (model) => {
    return {
        id: model.id,
        fullname: model.fullname,
        email: model.email,
        token: model.token,
        createdAt: model.updated_at ?? null,
        updatedAt: model.created_at ?? null,
    }
}

const toListDomainUser = (models = []) => {
    let event = [];
    if (models.length > 0) {
        for (const model of models) {
            event.push(toDomainUser(model))
        }
    }
    return event;
}

module.exports = {
    toDomainUser,
    toListDomainUser
}
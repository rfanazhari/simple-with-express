const toDomainCompany = (model) => {
    return {
        id: model.id,
        companyName: model.company_name,
        createdAt: model.created_date ?? null,
    }
}

const toListDomainCompany = (models = []) => {
    let event = [];
    if (models.length > 0) {
        for (const model of models) {
            event.push(toDomainCompany(model))
        }
    }
    return event;
}

module.exports = {
    toDomainCompany,
    toListDomainCompany
}
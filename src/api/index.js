import axios from "axios";

const BASEURL = 'http://localhost:14861/api/';

export const ENDPOINTS = {
    CONTACT: 'Contact',
    TAG: 'Tag',
    VCF: 'Vcf'
}

export const apiEndpoints = endpoint => {

    let url = BASEURL + endpoint + '/';

    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
        download: id => axios.get(url+ id),
        upload: formData => axios.post(url, formData)
    }
}
const cds = require('@sap/cds');
const { url } = require('node:inspector');
const { Worker, workerData, parentPort, isMainThread } = require('node:worker_threads')

if (isMainThread) {
    module.exports = cds.service.impl(async function () {
        let {
            attachments, tab1, tab2, tab3, vendor_data, Fvendor_responseoo, PAYMENT_TERM_DETAILS, WORKFLOW_HISTORY, PAN_PRICE_DETAILS, PAN_Payment_Method_Drop, PAN_Comments,
            PAN_Details_APR, PAN_WEB_EVENT_APR, PAN_TYPE_APR, PAN_vendor_data_APR, PAN_vendor_response_APR, PAN_PAYMENT_TERM_DETAILS_APR, PAN_PRICE_DETAILS_APR, PAN_WORKFLOW_HISTORY_APR, PAN_attachments_APR, PAN_Payment_Method_Drop_APR, PAN_Comments_APR, vendorTaxDetails_APR
        } = this.entities;
        let ariba = await cds.connect.to('ariba');
        //sourcing project api's
        var SourcingProjectUrl = process.env.SourcingProjectUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-project-management/v2/prod/projects/<projectId>";
        var SourcingProjectQuery = process.env.SourcingProjectQuery || "realm=PEOLSOLUTIONSDSAPP-T&user=puser1&passwordAdapter=PasswordAdapter1&apikey=gG0vXlJzZg6UzopL6lRvVjBwQKTbR0WJ";
        var SourcingProjectBasicPassword = process.env.SourcingProjectBasicPassword || "Basic OWExNmQ1MzktYzg4Ni00N2EzLTgxYTItNmY2NzAwMjEyNmJlOjJ2WnBBYWtNVVdzaEozYTdMbTllZ2dTc3N1dzgya3Rs";
        //Docs
        var SourcingProjectDocsUrl = process.env.SourcingProjectDocsUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-project-management/v2/prod/projects/<projectId>/documents";
        //teams
        var SourcingProjectTeamsUrl = process.env.SourcingProjectTeamsUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-project-management/v2/prod/projects/<projectId>/teams";
        //Documents/events api's
        var DocumentUrl = process.env.DocumentUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/<docId>";
        var DocumentQuery = process.env.DocumentQuery || "passwordAdapter=PasswordAdapter1&user=puser1&realm=PEOLSOLUTIONSDSAPP-T&apikey=RuU300xzEClMIpw8UBalRGERG9LQZcHG";
        var DocumentBasicPassword = process.env.DocumentBasicPassword || "Basic NTNiMTUxY2EtOTZkYS00ZmM2LWFlNDctZGNhMzg1YjA1ZDNlOkNqV04xbjB4akZ0QzQ5UFhSZnk2cUJORlhqak1sNjMy";
        //scenarios
        var DocumentScenariosUrl = process.env.DocumentScenariosUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/<docId>/scenarios";
        //supplierInvitations
        var DocumentSupplierInvitationsUrl = process.env.DocumentSupplierInvitationsUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/<docId>/supplierInvitations";
        //items with pages
        var DocumentItemsUrl = process.env.DocumentItemsUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/<docId>/items/pages/<pageNo>";
        //supplierBids
        var DocumentSupplierBidsUrl = process.env.DocumentSupplierBidsUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/<docId>/supplierBids/<sName>";
        //rounds
        var DocumentRoundsUrl = process.env.DocumentRoundsUrl || "https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/<docId>/rounds";
        //supplier data pagination api's
        var SupplierQuestionariesUrl = process.env.SupplierQuestionariesUrl || "https://openapi.au.cloud.ariba.com/api/supplierdatapagination/v4/prod//vendors/<vendorId>/workspaces/questionnaires/qna";
        var SupplierQuestionariesQuery = process.env.SupplierQuestionariesQuery || "realm=PEOLSOLUTIONSDSAPP-T&user=puser1&passwordAdapter=PasswordAdapter1&apikey=3TTrakeyAxb5iVfcZ9kdN4B9jMyyGxOJ";
        var SupplierQuestionariesBasicPassword = process.env.SupplierQuestionariesBasicPassword || "Basic NDVkZDg3ZjItMzVlZi00MzhhLTlmZTItNmU3M2M3YjBmMmJiOnpxR0wyZ2kxNmNyS1NqaU1aa2VTbGhFZThrVm5oNVdD";
        function returndate(input) {
            let a = input;
            let [y, m, d] = a.split('-');
            let jumbleDate = y + "/" + m + "/" + d
            return jumbleDate
        }
        this.on('getDataForUserAndProject', async (req) => {
            debugger
            //declare variables
            // Initialize as empty strings
            var projCurrency = "", Others = "", totalAwardPrice = '', ComplianceTerms = "", region1 = '', proj_currency = '', tech_commitee_clearedproposal = '',
                sup_main_add = '', sdate = "", eventNo = "", SBG = "", SBU = "", Discount_Amount = "", created_by = "",
                CommercialTerms = "", IndianTaxPER = "", delivery_date = "", date_obj = "", tolerence = "", Item_Code = "",
                delivery_schedule1 = "", v1amt = "", delivery_schedule = "", extend_price = "", Amount = "",
                UnitPrice = "", l4Amount = "", l3Amount = "", bid_currency = "", l1Amount = "", Freight = "",
                Quantity = "", ItemCode = "", SACCode = "", ItemShortDescription = "", ScopeandResponsibilities = "",
                cpbg = "", abg = "", inco_terms = "", inc = "", percentage1 = "", retention = "", due_date = "",
                by1 = "", by = "", retention_documents = "", progress_documents = "", Advance_per = "", Advance = "",
                webPublishDate = "", createDate = "", finalDate = "", task_id = "", per_pay_pro = "", per_pay_ret = "",
                projDesc = "", pay_date = "", tech_app = "", tech_acc = "", vfinal_quote = "", progress = "",
                acc_subdate = "", baseLinespend1 = "", baselinespend = "", discount_amt1 = "", final_quote = "", ainv_id = "", payment_type = "", returnDoc = "", plant = "",
                ser_mate = '', pvcode = '', requisitionId = "", icon_type = '', sm_id = "", smid = '', GstNo = "", cescore = "", supmainadd = "", houseID = "", city = "", postalCode = "",
                region = "", supplierdata = "", responsedata4 = "", country = "", contact_phone = "", mobile_phone = "",
                email = "", res_body = "", last_name = "", pcod = "", na_smdate = "", first_name = "", supplier_contact1 = "", sname = "", UOM = "";

            // Initialize as numbers
            var tec_app = 0, sup_count = 0, na_ind = 0, original_quote = 0, original_quote1 = 0, pageNo = 0, final_quote1 = 0, vendor_loc = 0, dis_per = 0, discount_amt2 = 0, discount_amt = 0, pVendor = 0, vc = 0, no_of_docs = 0;

            // Initialize as objects
            var webSupCount = {};
            var tapp = '', trank = '';
            // Initialize as arrays
            var sc_web_tab2 = [], na_date = [], pan_web_event = [], vendordata1 = [], shrt_lst_count = [], rounds_data = [],
                workerPromises = [], tec_rank = [], vendor_data = [], final_quotearr = [],
                pan_vendor_response = [], payment_details = [], supplier = [], version1 = [],
                vendorIds = [], l2Amount = [], l1amount = [], vendorIds1 = [], material_items = [],
                price_details = [], vendortaxdetails = [], price_details1 = [], venador_names = [],
                panheader = [], web_logic = [];

            let { user: userEmail, project: projectId } = req.data;
            created_by = userEmail;
            const createWorker = function (url, query, basis, path) {
                return new Promise((resolve) => {
                    const worker = new Worker(__filename, { workerData: { url: url, basis: basis, query: query, path, path } });
                    worker.on('message', (message) => {
                        resolve(message);
                    })
                })

            }
            try {


                let body = {
                    basis: SourcingProjectBasicPassword,
                    query: SourcingProjectQuery,
                    url: SourcingProjectDocsUrl.replace("<projectId>", projectId)
                };
                console.log("demo test")
                console.log(body)
                var pRes = await ariba.post('/', body);

                if (pRes.payload[0].type == 'RFx' && pRes.payload[0].status != 'Draft') {
                    let docId = pRes.payload[0].internalId;
                    let body = {
                        basis: DocumentBasicPassword,
                        query: DocumentQuery,
                        url: DocumentUrl.replace("<docId>", docId)
                    };
                    let res = await ariba.post('/', body);
                    if (res.pendingAwardApprovalTaskId) {
                        task_id = res.pendingAwardApprovalTaskId
                    }
                    else
                        return 'No Data for this Project!'

                    projCurrency = res.currency || "";
                    if (res.openDate) {
                        const dateObj = new Date(res.openDate);
                        webPublishDate = dateObj.toISOString().split('T')[0];
                    }
                    if (res.createDate) {
                        const dateObj = new Date(res.createDate);
                        createDate = dateObj.toISOString().split('T')[0];
                    }
                    if (createDate && webPublishDate) {
                        let date1 = new Date(createDate);
                        let date2 = new Date(webPublishDate);
                        let diffTime = Math.abs(date2 - date1);
                        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        finalDate = diffDays + " Days"
                    }
                    no_of_docs = {
                        doc_id: docId,
                        icon_type: pRes.payload[0].iconType,
                        status: pRes.payload[0].status,
                        web_pub_date: res.openDate,
                        web_publish_date: webPublishDate,
                        create_date: createDate,
                        final_date: finalDate,
                    };

                    try {
                        let body9 = [{
                            idd: '1',
                            PAN_Number: no_of_docs.doc_id,
                            Employee_ID: 'rajendraakshay1@gmail.com',
                            Employee_Name: 'rajendraakshay1@gmail.com',
                            level: '1'
                        }, {
                            idd: '2',
                            PAN_Number: no_of_docs.doc_id,
                            Employee_ID: 'rajendraakshay1@gmail.com',
                            Employee_Name: 'rajendraakshay1@gmail.com',
                            level: '2'
                        },
                        {
                            idd: '3',
                            PAN_Number: no_of_docs.doc_id,
                            Employee_ID: 'dhanush.gangatkar@peolsolutions.com',
                            Employee_Name: 'dhanush.gangatkar@peolsolutions.com',
                            level: '2'
                        }

                        ]
                        const response_PAN_WORKFLOW_HISTORY_APR = await INSERT.into(PAN_WORKFLOW_HISTORY_APR).entries(body9);
                    } catch (error) {
                        console.log(error)
                    }

                    let tsk_ind = await SELECT.from('PAN_Details').where('task_id =', task_id);
                    if (tsk_ind.length) {
                        return tsk_ind[0].PAN_Number;
                    } else {
                        function returnamt(amt) {
                            let formattedamt = parseFloat(amt);
                            formattedamt = formattedamt.toLocaleString('en-IN');;
                            return formattedamt;
                        }
                        workerPromises.push(createWorker(SourcingProjectUrl.replace('<projectId>', projectId), SourcingProjectQuery, SourcingProjectBasicPassword, 'SourcingProjectUrl'));
                        workerPromises.push(createWorker(SourcingProjectTeamsUrl.replace('<projectId>', projectId), SourcingProjectQuery, SourcingProjectBasicPassword, 'SourcingProjectTeamsUrl'));
                        workerPromises.push(createWorker(DocumentScenariosUrl.replace('<docId>', no_of_docs.doc_id), DocumentQuery, DocumentBasicPassword, 'DocumentScenariosUrl'));
                        workerPromises.push(createWorker(DocumentSupplierInvitationsUrl.replace('<docId>', no_of_docs.doc_id), DocumentQuery, DocumentBasicPassword, 'DocumentSupplierInvitationsUrl'));

                        let threadResults = await Promise.all(workerPromises);
                        threadResults.forEach(result => {
                            if (!(result instanceof Error)) {

                                switch (result.path) {
                                    case 'DocumentSupplierInvitationsUrl':
                                        webSupCount = result;
                                        break;
                                    case 'SourcingProjectUrl':
                                        projDesc = result.description || ""
                                        baseLinespend1 = returnamt(result.baselineSpend.amount || "")

                                        break;

                                    case 'DocumentScenariosUrl':
                                        if (result.payload[0].eventId && !(result instanceof Error)) {
                                            sup_count = result.payload[0].selectedSuppliersCount || "";
                                            shrt_lst_count = result;
                                            totalAwardPrice = returnamt(result.payload[0].totalAwardPrice.amount)
                                        }

                                        break;
                                }

                            }

                        });
                        if (webSupCount.payload.length) {
                            webSupCount.payload.forEach(suppl => {
                                pVendor += 1;
                                supplier.push({
                                    supplier_name: suppl.invitationId,
                                    smvendor_id: suppl.organization.smVendorID,
                                });
                                vendorIds.push({
                                    doc_id: no_of_docs.doc_id,
                                    pvcode: suppl.organization.erpVendorID,
                                    smvendor_id: suppl.organization.smVendorID,
                                    org_name: suppl.organization.name,
                                    vendor_loc: suppl.organization.address.city + " " + suppl.organization.address.country,
                                    vinv_id: suppl.invitationId
                                });
                            });
                        }
                        else {
                            pVendor = 0;
                        }
                        workerPromises = [];
                        if (supplier.length) { //getting vendor details
                            for (let k = 0; k < supplier.length; k++) {
                                sname = supplier[k].supplier_name;
                                if (vendorIds.length != 0) {
                                    var vendorid = vendorIds[k].smvendor_id;
                                    pvcode = vendorIds[k].smvendor_id;
                                    smid = vendorIds[k].smvendor_id;
                                } else {
                                    var vendorid = "";
                                    pvcode = "";
                                }
                                workerPromises.push(createWorker(DocumentSupplierBidsUrl.replace('<docId>', no_of_docs.doc_id).replace('<sName>', supplier[k].supplier_name), DocumentQuery, DocumentBasicPassword, 'DocumentSupplierBidsUrl'));
                                workerPromises.push(createWorker(DocumentRoundsUrl.replace('<docId>', no_of_docs.doc_id), DocumentQuery, DocumentBasicPassword, 'DocumentRoundsUrl'));
                                workerPromises.push(createWorker(SupplierQuestionariesUrl.replace('<vendorId>', vendorIds[k].smvendor_id), SupplierQuestionariesQuery, SupplierQuestionariesBasicPassword, 'SupplierQuestionariesUrl'));

                                var thread_results1 = await Promise.all(workerPromises);
                                if (thread_results1.length) {
                                    for (let i = 0; i < thread_results1.length; i++) {
                                        if (!Array.isArray(thread_results1[i].payload) && (!(thread_results1[i] instanceof Error))) {
                                            supplierdata = thread_results1[i];
                                        }
                                        else if (Array.isArray(thread_results1[i].payload) && thread_results1[i].path == 'DocumentSupplierBidsUrl' && (!(thread_results1[i] instanceof Error))) {
                                            responsedata4 = thread_results1[i];
                                        } else if (Array.isArray(thread_results1[i].payload) && thread_results1[i].path == 'DocumentRoundsUrl' && (!(thread_results1[i] instanceof Error))) {
                                            rounds_data = thread_results1[i];
                                        }
                                    }
                                }
                                if (supplierdata) {
                                    if ('_embedded' in supplierdata && 'questionAnswerList' in supplierdata._embedded) {
                                        for (let h = 0; h < supplierdata._embedded.questionAnswerList.length; h++) {
                                            if ('questionAnswer' in supplierdata._embedded.questionAnswerList[h] && 'questionLabel' in supplierdata._embedded.questionAnswerList[h].questionAnswer) {
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "GST Number") {
                                                    GstNo = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "(Technical) CE Eligibility Yes") {
                                                    cescore = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "Supplier Main Address") {
                                                    supmainadd = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                    const parsedData = JSON.parse(supmainadd);
                                                    if ("streetName" in parsedData.default) {
                                                        streetName = parsedData.default.streetName || '';
                                                    }
                                                    if ("houseID" in parsedData.default) {
                                                        houseID = parsedData.default.houseID || '';
                                                    }
                                                    if ("cityName" in parsedData.default) {
                                                        city = parsedData.default.cityName || '';
                                                    }
                                                    if ("streetPostalCode" in parsedData.default) {
                                                        postalCode = parsedData.default.streetPostalCode || '';
                                                    }
                                                    if ("regionCode" in parsedData.default) {
                                                        if ("Name" in parsedData.default.regionCode) {
                                                            region = parsedData.default.regionCode.Name || '';
                                                        }
                                                    }
                                                    if ("countryCode" in parsedData.default) {
                                                        if ("Name" in parsedData.default.countryCode) {
                                                            country = parsedData.default.countryCode.Name || '';
                                                        }
                                                    }
                                                    var formattedAddress = `${streetName}, ${houseID}, ${city}, ${postalCode}, ${country}`;
                                                    let resultArray = formattedAddress.split(',').map(item => item.trim()).filter(Boolean);
                                                    supmainadd = resultArray.join(', ');
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "Contact First Name") {
                                                    first_name = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "Contact Last Name") {
                                                    last_name = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "Contact Email") {
                                                    email = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "Mobile Phone") {
                                                    mobile_phone = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                                if (supplierdata._embedded.questionAnswerList[h].questionAnswer.questionLabel == "Contact Phone") {
                                                    contact_phone = supplierdata._embedded.questionAnswerList[h].questionAnswer.answer;
                                                }
                                            }
                                        }
                                        supplier_contact1 = first_name + " " + last_name;
                                    }
                                }
                                if (responsedata4 != []) {
                                    if (responsedata4.payload.length != 0) {
                                        eventNo = 0;


                                        for (let k2 = 0; k2 < responsedata4.payload.length; k2++) {
                                            //mod
                                            acc_subdate = responsedata4.payload[k2].submissionDate;
                                            if ("invitationId" in responsedata4.payload[k2]) {
                                                venador_names.push({
                                                    vname: responsedata4.payload[k2].invitationId
                                                });
                                            }
                                            if ("bidStatus" in responsedata4.payload[k2]) {
                                                if (responsedata4.payload[k2].bidStatus == "Accepted") {
                                                    if ("invitationId" in responsedata4.payload[k2]) {
                                                        ainv_id = responsedata4.payload[k2].invitationId;
                                                    }
                                                    // let b = responsedata4.payload[k2].item.itemId;
                                                    if ("submissionDate" in responsedata4.payload[k2]) {
                                                        var pay_date = responsedata4.payload[k2].submissionDate;
                                                        pay_date = pay_date.substring(0, 10);

                                                        pay_date = returndate(pay_date);
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Payment Method") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    payment_type = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                    payment_type = payment_type.toString();
                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Technical Review Rank") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    tech_app = responsedata4.payload[k2].item.terms[0].value.simpleValue;

                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Technical Review Acceptance") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    tech_acc = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                    if (tech_acc == "false") {
                                                                        tech_acc = "No";
                                                                    } else if (tech_acc == "true") {
                                                                        tech_acc = "Yes";
                                                                    }

                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Totals") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            total_terms = responsedata4.payload[k2].item.terms;
                                                            for (let k = 0; k < total_terms.length; k++) {
                                                                if (total_terms[k].fieldId == "TOTALCOST" || total_terms[k].title == "Total Cost") {
                                                                    if ("value" in total_terms[k]) {
                                                                        if ("supplierValue" in total_terms[k].value) {
                                                                            if ("amount" in total_terms[k].value.supplierValue) {
                                                                                vfinal_quote = total_terms[k].value.supplierValue.amount;
                                                                                // vfinal_quote = vfinal_quote.toString();
                                                                                acc_subdate = responsedata4.payload[k2].submissionDate;
                                                                            }
                                                                        }

                                                                    }
                                                                }
                                                            }

                                                        }

                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Progress") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                progress = responsedata4.payload[k2];
                                                                if ("simpleValue" in progress.item.terms[0].value) {
                                                                    progress = progress.item.terms[0].value.simpleValue;
                                                                    progress = progress.toString();
                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Percentage Payment for Progress") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("bigDecimalValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    per_pay_pro = responsedata4.payload[k2].item.terms[0].value.bigDecimalValue;
                                                                    per_pay_pro = per_pay_pro.toString() + "%";
                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Percentage Payment for Retention") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("bigDecimalValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    per_pay_ret = responsedata4.payload[k2].item.terms[0].value.bigDecimalValue;
                                                                    per_pay_ret = per_pay_ret.toString() + "%";
                                                                }
                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Advance") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    Advance = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                    Advance = Advance.toString();
                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Down Payment Percentage") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("bigDecimalValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    Advance_per = responsedata4.payload[k2].item.terms[0].value.bigDecimalValue;
                                                                    Advance_per = Advance_per + " %";
                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Mandatory Documents /Submissions for Progress") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValues" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    if (Array.isArray(responsedata4.payload[k2].item.terms[0].value.simpleValues)) {
                                                                        res = responsedata4.payload[k2].item.terms[0].value;

                                                                        for (let es = 0; es < res.simpleValues.length; es++) {
                                                                            progress_documents = res.simpleValues[es] + " ," + progress_documents;
                                                                        }
                                                                        progress_documents = progress_documents.trim();
                                                                    }
                                                                } else if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    progress_documents = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }
                                                            }
                                                        }

                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Mandatory Documents /Submissions for Retention") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValues" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    if (Array.isArray(responsedata4.payload[k2].item.terms[0].value.simpleValues)) {
                                                                        var res1 = responsedata4.payload[k2].item.terms[0].value;

                                                                        for (let es = 0; es < res1.simpleValues.length; es++) {
                                                                            retention_documents = res1.simpleValues[es] + ", " + retention_documents;

                                                                        }

                                                                        retention_documents = retention_documents.trim();
                                                                    }
                                                                } else if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    retention_documents = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }
                                                            }
                                                        }

                                                    }
                                                    if (responsedata4.payload[k2].item.title == "To be certified in Company by for Progress") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    by = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }

                                                            }
                                                        }

                                                    }

                                                    if (responsedata4.payload[k2].item.title == "To be certified in Company by for Retention") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simplrValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    by1 = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }

                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Retention Due Date") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("dateValue" in responsedata4.payload[k2].item.terms[0]) {
                                                                    due_date = responsedata4.payload[k2].item.terms[0].value.dateValue;
                                                                    due_date = due_date.substring(0, 10);
                                                                    due_date = returndate(due_date);
                                                                }

                                                            }
                                                        }


                                                    }

                                                    if (responsedata4.payload[k2].item.title == "Retention") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    retention = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                    retention = retention.toString();
                                                                }

                                                            }
                                                        }
                                                    }
                                                    if (responsedata4.payload[k2].item.title == "Percentage Total") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("bigDecimalValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    var percentage = responsedata4.payload[k2].item.terms[0].value.bigDecimalValue;
                                                                    percentage1 = percentage.toString();
                                                                }

                                                            }
                                                        }
                                                    }

                                                    //Terms and conditions to be compared with
                                                    if (ser_mate == "Material" || ser_mate == "Both") {
                                                        inc = responsedata4.payload[k2].item.title;
                                                        inc = inc.substring(0, 9);

                                                        if (inc == "IncoTerms") {
                                                            if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                                if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                    if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                        inco_terms = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                        inco_terms = inco_terms.toString();
                                                                    }

                                                                }
                                                            }
                                                        }
                                                    }

                                                    if (ser_mate == "Service") {
                                                        inc = responsedata4.payload[k2].item.title;
                                                        inc = inc.substring(0, 9);

                                                        if (inc == "IncoTerms") {
                                                            if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                                if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                    if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                        inco_terms = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                        inco_terms = inco_terms.toString();
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    if (responsedata4.payload[k2].item.title == "ABG (Advance Bank Guarantee)") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("bigDecimalValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    abg = responsedata4.payload[k2].item.terms[0].value.bigDecimalValue;
                                                                    abg = abg.toString();
                                                                    abg = abg + " %"
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (responsedata4.payload[k2].item.title == "CPBG (Contract Performance Bank Guarantee)") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("bigDecimalValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    cpbg = responsedata4.payload[k2].item.terms[0].value.bigDecimalValue;
                                                                    cpbg = cpbg.toString();
                                                                    cpbg = cpbg + " %"
                                                                }
                                                            }
                                                        }
                                                    }

                                                    //other terms and conditions
                                                    if (responsedata4.payload[k2].item.title == "Scope and Responsibilities") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    ScopeandResponsibilities = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                    ScopeandResponsibilities = ScopeandResponsibilities.toString();
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (responsedata4.payload[k2].item.title == "Commercial Terms") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    CommercialTerms = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (responsedata4.payload[k2].item.title == "Compliance Terms") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    ComplianceTerms = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (responsedata4.payload[k2].item.title == "Others") {
                                                        if ("terms" in responsedata4.payload[k2].item && responsedata4.payload[k2].item.terms.length != 0) {
                                                            if ("value" in responsedata4.payload[k2].item.terms[0]) {
                                                                if ("simpleValue" in responsedata4.payload[k2].item.terms[0].value) {
                                                                    Others = responsedata4.payload[k2].item.terms[0].value.simpleValue;
                                                                }

                                                            }
                                                        }
                                                    }

                                                    //price details
                                                    if (responsedata4.payload[k2].item.title == "Totals") {
                                                        if ("itemsWithBid" in responsedata4.payload[k2] && responsedata4.payload[k2].itemsWithBid.length != 0) {
                                                            for (let v = 0; v < responsedata4.payload[k2].itemsWithBid.length; v++) {
                                                                material_items.push({
                                                                    itemid: responsedata4.payload[k2].itemsWithBid[v],
                                                                })
                                                            }
                                                        }

                                                        console.log("stage2.1")

                                                        // if (ser_mate == "Material" || ser_mate == "Both") {
                                                        if (material_items.length != 0) {
                                                            for (let b = 0; b < material_items.length; b++) {
                                                                for (let a = 0; a < responsedata4.payload.length; a++) {
                                                                    if (responsedata4.payload[a].itemId == material_items[b].itemid) {
                                                                        if ("bidStatus" in responsedata4.payload[k2]) {
                                                                            if (responsedata4.payload[k2].bidStatus == "Accepted") {
                                                                                if ("item" in responsedata4.payload[a]) {
                                                                                    if ("title" in responsedata4.payload[a].item) {
                                                                                        ItemShortDescription = responsedata4.payload[a].item.title;
                                                                                        Item_Code = responsedata4.payload[a].item.itemId;
                                                                                    }
                                                                                }
                                                                                if ("terms" in responsedata4.payload[a].item && responsedata4.payload[a].item.terms.length != 0) {
                                                                                    let terms = responsedata4.payload[a].item.terms;
                                                                                    if (terms.length != 0) {
                                                                                        var value1 = "value";
                                                                                        for (let m = 0; m < terms.length; m++) {
                                                                                            if (terms[m].title == "SACCode") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    SACCode = terms[m].value.simpleValue;
                                                                                                } else {
                                                                                                    SACCode = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Material Code") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    ItemCode = terms[m].value.simpleValue;
                                                                                                    let match = ItemCode.match(/^\d+/);
                                                                                                    let output = match ? match[0] : null;
                                                                                                    ItemCode = output;
                                                                                                } else {
                                                                                                    ItemCode = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Quantity") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    UOM = terms[m].value.quantityValue.unitOfMeasureName;
                                                                                                    Quantity = terms[m].value.quantityValue.amount;
                                                                                                    Quantity = Quantity.toLocaleString('en-US');
                                                                                                } else {
                                                                                                    Quantity = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Freight") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    Freight = terms[m].value.moneyValue.amount;
                                                                                                } else {
                                                                                                    Freight = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Total Cost") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    l1Amount = l1Amount + terms[m].value.moneyValue.amount;
                                                                                                    bid_currency = terms[m].value.supplierValue.currency;
                                                                                                    l3Amount = terms[m].value.moneyValue.amount;
                                                                                                    l4Amount = returnamt(l3Amount);
                                                                                                } else {
                                                                                                    l1Amount = 0;
                                                                                                    bid_currency = "";
                                                                                                    l3Amount = 0;
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Price") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    UnitPrice = terms[m].value.moneyValue.currency;
                                                                                                    Amount = terms[m].value.moneyValue.amount;
                                                                                                    if (UnitPrice == "INR") {
                                                                                                        Amount = Amount.toLocaleString('en-IN');
                                                                                                    }
                                                                                                    if (UnitPrice == "USD") {
                                                                                                        Amount = Amount.toLocaleString('en-US');
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    UnitPrice = "";
                                                                                                    Amount = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Extended Price") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    extend_price = terms[m].value.moneyValue.amount;
                                                                                                    extend_price = returnamt(extend_price);
                                                                                                }
                                                                                                else {
                                                                                                    extend_price = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Delivery Schedule - Quantity") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    delivery_schedule = terms[m].value.simpleValue;
                                                                                                }
                                                                                                else {
                                                                                                    delivery_schedule = "";
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Delivery Schedule - Date") {
                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    delivery_schedule1 = terms[m].value.simpleValue;
                                                                                                    if (delivery_schedule != "") {
                                                                                                        delivery_schedule = delivery_schedule + " " + delivery_schedule1;
                                                                                                    }
                                                                                                }
                                                                                                else {
                                                                                                    delivery_schedule = ""
                                                                                                }
                                                                                            }
                                                                                            if (terms[m].title == "Quantity Over Delivery Tolerance") {


                                                                                                if (Object.keys(terms[m]).includes(value1)) {
                                                                                                    tolerence = terms[m].value.simpleValue;
                                                                                                } else {
                                                                                                    tolerence = ""
                                                                                                }
                                                                                                if (terms[m].title == "Delivery Date") {
                                                                                                    if (Object.keys(terms[m]).includes(value1)) {
                                                                                                        var date_obj = terms[m].value.dateValue;
                                                                                                        date_obj = new Date(date_obj);
                                                                                                        delivery_date = date_obj.toISOString().split('T')[0];
                                                                                                        delivery_date = returndate(delivery_date);
                                                                                                    } else {
                                                                                                        delivery_date = ""
                                                                                                    }
                                                                                                }
                                                                                                if (terms[m].title == "Tax") {
                                                                                                    if (Object.keys(terms[m]).includes(value1)) {
                                                                                                        IndianTaxPER = terms[m].value.simpleValue;
                                                                                                    } else {
                                                                                                        IndianTaxPER = "";
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        // }
                                                                        // if (no_of_docs.doc_id != no_of_docs.doc_id) {


                                                                        vendortaxdetails.push({
                                                                            Proposed_Vendor_Code: `${pvcode}`,
                                                                            PAN_Number: `${no_of_docs.doc_id}`,
                                                                            Item_Code: `${ItemCode}`,
                                                                            name: "Freight",
                                                                            value: `${Freight}`,
                                                                        })
                                                                        price_details1.push({
                                                                            Proposed_Vendor_Code: `${pvcode}`,
                                                                            PAN_Number: `${no_of_docs.doc_id}`,
                                                                            item_name: `${ItemShortDescription}`,
                                                                            inv_id: `${sname}`,
                                                                            amount: `${l3Amount}`,
                                                                        })
                                                                    }
                                                                }
                                                                price_details.push({
                                                                    Proposed_Vendor_Code: `${pvcode}`,
                                                                    PAN_Number: `${no_of_docs.doc_id}`,
                                                                    Item_Code: Item_Code,
                                                                    Proposed_Vendor_Code: `${pvcode}`,
                                                                    PAN_Number: `${no_of_docs.doc_id}`,
                                                                    HSN_OR_SAC_Code: `${SACCode}`,
                                                                    Item_Short_Description: `${ItemShortDescription}`,
                                                                    UOM: `${UOM}`,
                                                                    Quantity: `${Quantity}`,
                                                                    Unit_Price: `${Amount}`,
                                                                    Amount: `${l4Amount}`,
                                                                    extendedPrice: `${extend_price}`,
                                                                    Indian_Tax_PER: `${IndianTaxPER}`,
                                                                    Quantity_Over_Delivery_Tolerance: `${tolerence}`,
                                                                })
                                                                Item_Code = "";
                                                                SACCode = "";
                                                                ItemCode = "";
                                                                ItemShortDescription = "";
                                                                UOM = "";
                                                                Quantity = "";
                                                                Amount = "";
                                                                l4Amount = "";
                                                                extend_price = "";
                                                                IndianTaxPER = "";
                                                                tolerence = "";
                                                                l3Amount = 0;
                                                                l1amount.push(
                                                                    l1Amount,
                                                                )
                                                                l2Amount = l1Amount;
                                                                l2Amount = returnamt(l2Amount);
                                                                l1Amount = 0;
                                                            }
                                                            material_items = [];
                                                        }
                                                        // }
                                                    }
                                                    else if (responsedata4.payload[k2].bidStatus == "Replaced") {
                                                        var value3 = "value";
                                                        var roll = "rollUpTerms";
                                                        var roll1 = "terms"
                                                        vc = 0;
                                                        if (responsedata4.payload[k2].item.title == "Pricing") {
                                                            // if()
                                                            if (Object.keys(responsedata4.payload[k2].item).includes(roll)) {
                                                                if (responsedata4.payload[k2].item.rollUpTerms.length != 0) {
                                                                    if (Object.keys(responsedata4.payload[k2].item.rollUpTerms[0]).includes(value3)) {
                                                                        console.log("version")
                                                                        if (responsedata4.payload[k2].item.rollUpTerms.length != 0) {
                                                                            for (r = 0; r < responsedata4.payload[k2].item.rollUpTerms.length; r++) {
                                                                                if (responsedata4.payload[k2].item.rollUpTerms[r].title == "Total Cost") {
                                                                                    if ("value" in responsedata4.payload[k2].item.rollUpTerms[r]) {
                                                                                        if ("moneyValue" in responsedata4.payload[k2].item.rollUpTerms[r].value) {
                                                                                            if ("amount" in responsedata4.payload[k2].item.rollUpTerms[r].value.moneyValue) {
                                                                                                v1amt = responsedata4.payload[k2].item.rollUpTerms[r].value.moneyValue.amount;
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        }
                                                                        version1.push({
                                                                            PAN_Number: no_of_docs.doc_id,
                                                                            Proposed_vendor_code: pvcode,
                                                                            final_quote: v1amt,
                                                                            sub_date: responsedata4.payload[k2].submissionDate,
                                                                            inv_id: responsedata4.payload[k2].invitationId,
                                                                            vcount: vc,
                                                                            sm_id: smid,
                                                                            type: pRes.payload[0].iconType,

                                                                        })
                                                                        var sdate = responsedata4.payload[k2].submissionDate;
                                                                        sdate = sdate.substring(0, 10);

                                                                        eventNo = eventNo + 1;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    ///////////////////
                                };
                                payment_details.push({
                                    "slNo": 1,
                                    "Proposed_Vendor_Code": `${pvcode}`,
                                    "PAN_Number": `${no_of_docs.doc_id}`,
                                    "iddd": "Advance",
                                    "Payment_methord": `${payment_type}`,
                                    "Percentage": `${Advance_per}`,
                                    "Description": `${Advance}`,
                                    "Due_date": `${due_date}`,
                                    "Mandatory_Documents_OR_Submissions": "",
                                    "To_be_certified_in_Company": "",
                                })
                                payment_details.push({
                                    "slNo": 2,
                                    "Proposed_Vendor_Code": `${pvcode}`,
                                    "PAN_Number": `${no_of_docs.doc_id}`,
                                    "iddd": "Progress",
                                    "Payment_methord": `${payment_type}`,
                                    "Percentage": `${per_pay_pro}`,
                                    "Description": `${progress}`,
                                    "Due_date": `${due_date}`,
                                    "Mandatory_Documents_OR_Submissions": `${progress_documents}`,
                                    "To_be_certified_in_Company": `${by}`
                                })
                                payment_details.push({
                                    "slNo": 3,
                                    "Proposed_Vendor_Code": `${pvcode}`,
                                    "PAN_Number": `${no_of_docs.doc_id}`,
                                    "iddd": "Retention",
                                    "Payment_methord": `${payment_type}`,
                                    "Percentage": `${per_pay_ret}`,
                                    "Description": `${retention}`,
                                    "Due_date": `${due_date}`,
                                    "Mandatory_Documents_OR_Submissions": `${retention_documents}`,
                                    "To_be_certified_in_Company": `${by1}`

                                })

                                payment_details.push({
                                    "slNo": 4,
                                    "Proposed_Vendor_Code": `${pvcode}`,
                                    "PAN_Number": `${no_of_docs.doc_id}`,
                                    "iddd": "Percentage Total",
                                    "Payment_methord": "",
                                    "Percentage": `${percentage1}`,
                                    "Description": "",
                                    "Due_date": "",
                                    "Mandatory_Documents_OR_Submissions": "",
                                    "To_be_certified_in_Company": ""

                                })


                                payment_type = "";
                                Advance = "";
                                progress = "";
                                due_date = "";
                                per_pay_pro = "";
                                progress_documents = "";
                                by = "";
                                per_pay_ret = "";
                                retention_documents = "";
                                by1 = "";
                                percentage1 = "";
                                final_quotearr.push({
                                    PAN_Number: no_of_docs.doc_id,
                                    Proposed_vendor_code: pvcode,
                                    final_quote: vfinal_quote,
                                    sub_date: acc_subdate,
                                    inv_id: ainv_id,
                                    vcount: vc,
                                    sm_id: smid,
                                    type: pRes.payload[0].iconType,

                                })

                                tec_rank.push({
                                    PAN_Number: no_of_docs.doc_id,
                                    Proposed_vendor_code: pvcode,
                                    techacc: tech_acc,
                                    techrank: tech_app,
                                })


                                vfinal_quote = 0;
                                ainv_id = "";
                                acc_subdate = "";


                                progress_documents = "";
                                retention_documents = "";

                                pan_vendor_response.push({
                                    Proposed_Vendor_Code: `${pvcode}`,
                                    PAN_Number: `${no_of_docs.doc_id}`,
                                    Proposed_Vendor_Name: vendorIds[k].org_name,
                                    Supplier_Origin_State: `${region1}`,
                                    Destination_State_BKTShipDASHto_LocationBKT: `${sup_main_add}`,
                                    Vendor_GST_Number: `${GstNo}`,
                                    Vendor_CE_Score: "",
                                    Vendor_CE_Date: "",
                                    Vendor_PE_Score: "",
                                    Vendor_PE_Date: "",
                                    Vendor_Contact_PersonDASH1: `${supplier_contact1}`,
                                    Vendor_Contact_PersonDASH2: "",
                                    Technical_Committee_who_cleared_the_proposal: `${tech_commitee_clearedproposal}`,
                                    Commercial_Committee_who_cleared_the_proposal: "",
                                    Vendor_References_to_be_displayed_in_Order: "",
                                    Shortlisted_Vendors_Response_summary: "",//title
                                    Incoterms: `${inco_terms}`,
                                    Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC: "",
                                    Details_of_deviated_or_better_terms_agreed_with_the_Vendor: "",
                                    Market_Scenario_and_Demand: "",
                                    Companys_Position_and_Market_dynamics_of_this_purchase: "",
                                    Should_Be_Cost_estimated: "",
                                    Highlights_of_this_proposal_and_Price_Justification_for_this_proposal: "",
                                    Price_Escalation_Agreed_if_any: "",
                                    Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor: "",
                                    Transportation: "",
                                    Logistics_Cost: "",
                                    Delivery_Schedule: `${delivery_schedule}`,
                                    Tax_Details: "",
                                    Additional_Remarks: "",
                                    ABG: `${abg}`,
                                    ABG_Value: "",
                                    CPBG: `${cpbg}`,
                                    CPBG_Value: "",
                                    Scope_and_Responsibilities: `${ScopeandResponsibilities}`,
                                    Commercial_Terms: `${CommercialTerms}`,
                                    Compliance_Terms: `${ComplianceTerms}`,
                                    Others: `${Others}`,
                                    Order_Value_BKTIn_Project_CurrencyBKT: `${Amount}`,
                                    Order_Value_BKTIn_Bid_CurrencyBKT: `${bid_currency}`,
                                    Vendor_Final_Quotation_Date: `${pay_date}`,
                                    Vendor_Final_Quotation_Amount: "0",
                                    Project_CurrencyORBase_Currency: `${proj_currency}`,
                                    Order_CurrencyORBid_currency: `${proj_currency}`,


                                })

                                Amount = "";
                                region = "";
                                supmainadd = "";
                                GstNo = "";
                                cescore = "";
                                supplier_contact1 = "";
                                progress_documents = "";
                                inco_terms = "";
                                cpbg = "";
                                delivery_schedule = "";
                                abg = "";
                                ScopeandResponsibilities = "";
                                CommercialTerms = "";
                                ComplianceTerms = "";
                                Others = "";
                                pay_date = "";
                                bid_currency = "";
                                pay_date = "";

                                //  if(no_of_docs.doc_id != no_of_docs.doc_id){

                                vendor_data.push({
                                    Proposed_Vendor_Code: `${pvcode}`, //disp
                                    PAN_Number: `${no_of_docs.doc_id}`,
                                    Awarded_Vendor: "NO",
                                    Vendor_Name: `${vendorIds[k].org_name}`,//disp
                                    Vendor_Location: `${tech_acc}`,
                                    Technically_Approved: `${tech_app}`,
                                    Original_quote: "",//disp
                                    Final_Quote: "", //disp
                                    Order_amount_OR_Split_order_amount: "",
                                    // Proposed_Vendor_Code_nav           : "",
                                    Discount_Amount: "",
                                    Discount_percentage: "",
                                    Rank: "0",

                                })

                                tech_acc = "";
                                tech_app = "";

                            }


                            var vendorids1 = vendorIds;
                            vendorIds = [];
                        }
                        ///////////23/6/2025///////////////
                        var supcount = {};
                        var supcount1 = venador_names.filter(obj => {
                            if (!supcount[obj.vname]) {
                                supcount[obj.vname] = true;
                                return true;
                            }
                            return false
                        })

                        sc_web_tab2.push({
                            scount: supcount1.length,
                            doc_id: no_of_docs.doc_id
                        })
                        venador_names = [];
                        supcount1 = [];

                        pVendor = 0;


                        panheader.push({
                            "PAN_Number": no_of_docs.doc_id,
                            "SBG": `${SBG}`,
                            "SBU": `${SBU}`,
                            "Project_Description": `${projDesc}`,
                            "PR_NumberBKTsBKT": `${projectId}`,
                            "Split_OrderORNo_of_vendors": sup_count.toString(),
                            "Base_line_spend": baseLinespend1.toString(),
                            "Project_CurrencyORBase_Currency": `${proj_currency}`,
                            "Order_CurrencyORBid_currency": `${proj_currency}`,
                            "Final_proposed_Value": l1Amount.toString(),
                            "Savings_achieved_btw_initial_and_final_quote": Discount_Amount.toString(),
                            "Savings_against_base_line_spend_of_RFP": "0",
                            "Number_of_Vendors_Shortlisted_for_RFP": sup_count.toString(),
                            "Required_at_Site_Date": `${delivery_date}`,
                            "RFP_Number": `${no_of_docs.doc_id}`,
                            "RFP_Publish_Date": `${no_of_docs.web_publish_date}`,
                            "Time_Taken_for_FinalizationDASHIn_DAYS": `${no_of_docs.final_date}`,
                            "created_by": `${created_by}`,
                            "task_id": `${task_id}`,
                            "type": `${no_of_docs.icon_type}`,
                            "status_a": `${pRes.payload[0].status}`,
                            "ProjectId": `${projectId}`,

                        })

                        supplier = [];
                        l1Amount = [];
                        pVendor = 0;
                        l1amount = 0;



                    }


                }

                web_logic = [
                    ...version1,
                    ...final_quotearr
                ]
                var fstdoc = "";

                if (web_logic.length != 0) {

                    for (let i = 0; i < web_logic.length; i++) {
                        if (web_logic[i].type != "RFQ") {
                            fstdoc = web_logic[i].PAN_Number;
                            break;
                        }

                    }

                    var oneround = 0;
                    var oneround1 = 0;
                    var type1 = "";
                    var type = "";
                    var typew = "";
                    var date = [], date1 = [];
                    // for (let d = 0; d < web_logic.length; d++) {

                    //     if (web_logic[d].sub_date != "") {
                    //         typew = web_logic[d].type;
                    //         date.push(web_logic[d].sub_date)
                    //     }
                    //     if (web_logic[d].type != "RFQ") {
                    //         if (web_logic[d].sub_date != "") {
                    //             date1.push(web_logic[d].sub_date)
                    //         }

                    //     }
                    //     if (oneround1 == 0 && typew == "RFP" || oneround1 == 0 && typew == "RFI") {
                    //         if (fstdoc != web_logic[d].PAN_Number) {
                    //             oneround = 1;
                    //             type = web_logic[d].type;
                    //         }
                    //     }
                    //     if (web_logic[d].type == "RFQ") {
                    //         oneround = 1;
                    //         type1 = web_logic[d].type;
                    //     }
                    // }
                    var greatestDate = "";
                    var smallestdate = ""
                    // if (version1.length != 0 || no_of_docs) {
                    //     smallestdate = date.reduce((acc, curr) => curr < acc ? curr : acc, date[0]);
                    //     greatestDate = date.reduce((acc, curr) => curr > acc ? curr : acc, date[0]);
                    // }
                    // else if (version1.length == 0 && no_of_docs) {
                    //     smallestdate = date.reduce((acc, curr) => curr < acc ? curr : acc, date[0]);
                    // }

                    // for (let q = 0; q < sc_web_tab2.length; q++) {
                    //     for (let r = 0; r < web_logic.length; r++) {
                    //         if (web_logic[r].sub_date != "") {
                    //             if ((web_logic[r].sub_date == smallestdate) && (web_logic[r].PAN_Number == sc_web_tab2[q].doc_id)) {
                    //                 var dateString = web_logic[r].sub_date;
                    //                 var datesub = dateString.substring(0, 10)
                    //                 datesub = returndate(datesub);
                    //                 var no_v = sc_web_tab2[q].scount;
                    //                 var am = web_logic[r].final_quote;
                    //                 // am = returnamt(am);
                    //                 number = sc_web_tab2[q].doc_id;

                    //                 // number = number.substring(number.length - 4)
                    //                 if (pan_web_event.length == 0) {
                    //                     // if(web_tab_dates.length !=1){
                    //                     pan_web_event.push({
                    //                         idd: "1",
                    //                         PAN_Number: no_of_docs.doc_id.toString(),
                    //                         eventNo: "First Published",
                    //                         number: `${number}`,
                    //                         date: `${datesub}`,
                    //                         numberOfVendorsParticipated: no_v.toString(),
                    //                         l1AmountObtained: am.toString(),
                    //                     })
                    //                     // }
                    //                 }

                    //             }

                    //             else if ((web_logic[r].sub_date == greatestDate) && (web_logic[r].PAN_Number == sc_web_tab2[q].doc_id)) {
                    //                 if (version1.length != [] && oneround == 0) {
                    //                     var dateString = web_logic[r].sub_date;
                    //                     var datesub = dateString.substring(0, 10)
                    //                     datesub = returndate(datesub);
                    //                     var no_v = sc_web_tab2[q].scount;
                    //                     var am = web_logic[r].final_quote;
                    //                     // am = returnamt(am);
                    //                     number = sc_web_tab2[q].doc_id;
                    //                     // number = number.substring(number.length - 4)
                    //                     if (pan_web_event.length == 1) {
                    //                         // if(web_tab_dates.length !=1){
                    //                         pan_web_event.push({
                    //                             idd: "2",
                    //                             PAN_Number: no_of_docs.doc_id.toString(),
                    //                             eventNo: "Last Published(Before RA)",
                    //                             number: `${number}`,
                    //                             date: `${datesub}`,
                    //                             numberOfVendorsParticipated: no_v.toString(),
                    //                             l1AmountObtained: am.toString(),
                    //                         })
                    //                         // }
                    //                     }
                    //                 }

                    //             }
                    //         }
                    //         // break;
                    //     }
                    //     // break;
                    // }

                    // if (oneround == 1 && type == "RFP" || oneround == 1 && type == "RFI") {
                    //     var round2_date = date1.reduce((acc, curr) => curr > acc ? curr : acc, date1[0]);
                    //     for (let q = 0; q < sc_web_tab2.length; q++) {
                    //         for (let r = 0; r < web_logic.length; r++) {
                    //             if (web_logic[r].sub_date != "") {
                    //                 if ((web_logic[r].sub_date == round2_date) && (web_logic[r].PAN_Number == sc_web_tab2[q].doc_id)) {
                    //                     var dateString = web_logic[r].sub_date;
                    //                     var datesub = dateString.substring(0, 10)
                    //                     datesub = returndate(datesub);
                    //                     var no_v = sc_web_tab2[q].scount;
                    //                     var am = web_logic[r].final_quote;
                    //                     // am = returnamt(am);
                    //                     number = sc_web_tab2[q].doc_id;
                    //                     // number = number.substring(number.length - 4)
                    //                     if (pan_web_event.length == 1) {
                    //                         pan_web_event.push({
                    //                             idd: "2",
                    //                             PAN_Number: no_of_docs.doc_id.toString(),
                    //                             eventNo: "Last Published(Before RA)",
                    //                             number: `${number}`,
                    //                             date: `${datesub}`,
                    //                             numberOfVendorsParticipated: no_v.toString(),
                    //                             l1AmountObtained: am.toString(),
                    //                         })
                    //                     }

                    //                 }
                    //             }
                    //             // break;
                    //         }
                    //         // break;
                    //     }
                    // }

                    if (totalAwardPrice) {
                        // let firstRound=rounds_data.payload.filter((r)=>r.roundNumber==1);
                        let firstRound = Array.isArray(rounds_data?.payload) ? rounds_data.payload.filter((r) => r.roundNumber === 1) : [];
                        // let lastRound=rounds_data.payload.filter((r)=>r.roundNumber==rounds_data.payload.length);
                        let lastRound = rounds_data?.payload?.filter?.(
                            (r) => r.roundNumber === rounds_data.payload.length
                        ) || [];

                        // pan_web_event.push({
                        //     idd: "1",
                        //     PAN_Number: no_of_docs.doc_id.toString(),
                        //     eventNo: "First Published",
                        //     number: `${no_of_docs.doc_id}(Round 1)`,
                        //     date: returndate(firstRound[0].biddingStartDate.substring(0, 10)),
                        //     numberOfVendorsParticipated: firstRound[0].suppliers.length.toString(),
                        //     l1AmountObtained: 'N/A',
                        // })
                        let first = firstRound?.[0] || {}; // Safely get first round object or default to empty object
                        let last = lastRound?.[0] || {}; // Fallback to empty object if undefined
                        pan_web_event.push({
                            idd: "1",
                            PAN_Number: no_of_docs?.doc_id?.toString() || "",
                            eventNo: "First Published",
                            number: `${no_of_docs?.doc_id || ""}(Round 1)`,
                            date: first?.biddingStartDate
                                ? returndate(first.biddingStartDate.substring(0, 10))
                                : "",
                            numberOfVendorsParticipated: Array.isArray(first?.suppliers)
                                ? first.suppliers.length.toString()
                                : "0",
                            l1AmountObtained: "N/A",
                        });
                        // pan_web_event.push({
                        //     idd: "2",
                        //     PAN_Number: no_of_docs.doc_id.toString(),
                        //     eventNo: "Last Published(Before RA)",
                        //     number: `${no_of_docs.doc_id}(Round ${lastRound[0].roundNumber})`,
                        //     date: returndate(lastRound[0].biddingStartDate.substring(0, 10)),
                        //     numberOfVendorsParticipated: lastRound[0].suppliers.length.toString(),
                        //     l1AmountObtained: totalAwardPrice,
                        // })

                        pan_web_event.push({
                            idd: "2",
                            PAN_Number: no_of_docs?.doc_id?.toString() || "",
                            eventNo: "Last Published(Before RA)",
                            number: `${no_of_docs?.doc_id || ""}(Round ${last?.roundNumber || "?"})`,
                            date: last?.biddingStartDate
                                ? returndate(last.biddingStartDate.substring(0, 10))
                                : "",
                            numberOfVendorsParticipated: Array.isArray(last?.suppliers)
                                ? last.suppliers.length.toString()
                                : "0",
                            l1AmountObtained: totalAwardPrice || "N/A",
                        });
                    }
                }

                // if (pan_web_event.length == 1) {
                //     for (let k = 2; k < 4; k++) {
                //         var event2 = "";
                //         if (k == 2) {
                //             event2 = "Last Published(Before RA)"
                //         }
                //         else if (k == 3) {
                //             event2 = "Reverse Auction(RA)"
                //         }
                //         pan_web_event.push({
                //             idd: `${k}`,
                //             PAN_Number: no_of_docs.doc_id,
                //             eventNo: `${event2}`,
                //             number: "NA",
                //             date: "NA",
                //             numberOfVendorsParticipated: "NA",
                //             l1AmountObtained: "0",
                //         })
                //     }
                // }

                // if (pan_web_event.length == 2) {
                //     pan_web_event.push({
                //         idd: "3",
                //         PAN_Number: no_of_docs.doc_id.toString(),
                //         eventNo: "Reverse Auction(RA)",
                //         number: "NA",
                //         date: "NA",
                //         numberOfVendorsParticipated: "NA",
                //         l1AmountObtained: "0",
                //     })
                // }

                var ch = 0
                if (shrt_lst_count.payload.length != 0) {

                    for (let r = 0; r < shrt_lst_count.payload.length; r++) {

                        if ((shrt_lst_count.payload[r].awardStatus == 7) || shrt_lst_count.payload[r].awardStatus == 6) {
                            ch = 1;
                            if ("rollupTerms" in shrt_lst_count.payload[r] && shrt_lst_count.payload[r].rollupTerms.length != 0) {
                                for (let j = 0; j < shrt_lst_count.payload[r].rollupTerms.length; j++) {
                                    if (ser_mate == "Material" || ser_mate == "Both") {
                                        if (shrt_lst_count.payload[r].rollupTerms[j].title == "Total Cost") {
                                            if ("value" in shrt_lst_count.payload[r].rollupTerms[j]) {
                                                if ("supplierValue" in shrt_lst_count.payload[r].rollupTerms[j].value) {
                                                    if ("amount" in shrt_lst_count.payload[r].rollupTerms[j].value.supplierValue) {
                                                        final_quote = shrt_lst_count.payload[r].rollupTerms[j].value.supplierValue.amount;
                                                    }
                                                }
                                            }

                                            // final_quote1 = returnamt(final_quote);

                                        }
                                    }
                                    else if (ser_mate == "Service") {
                                        if (shrt_lst_count.payload[r].rollupTerms[j].title == "Extended Price") {

                                            if ("value" in shrt_lst_count.payload[r].rollupTerms[j]) {
                                                if ("supplierValue" in shrt_lst_count.payload[r].rollupTerms[j].value) {
                                                    if ("amount" in shrt_lst_count.payload[r].rollupTerms[j].value.supplierValue) {
                                                        final_quote = shrt_lst_count.payload[r].rollupTerms[j].value.supplierValue.amount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if ("scenarioSummary" in shrt_lst_count.payload[r]) {
                                if ("participantSummaryList" in shrt_lst_count.payload[r].scenarioSummary && shrt_lst_count.payload[r].scenarioSummary.participantSummaryList.length != 0) {

                                    for (let q = 0; q < shrt_lst_count.payload[r].scenarioSummary.participantSummaryList.length; q++) {

                                        if ("supplier" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q]) {
                                            if ("name" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].supplier) {
                                                vname = shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].supplier.name;
                                            }

                                            // erp_id = shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].supplier.erpVendorID;
                                            if ("smVendorID" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].supplier) {
                                                sm_id = shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].supplier.smVendorID;
                                            }

                                        }
                                        if (vname == null) {
                                            vname = "";
                                        }
                                        if (sm_id == null) {
                                            sm_id = "";
                                        }
                                        var loc = "";
                                        if (ser_mate == "Material" || ser_mate == "Both") {
                                            loc = "Total Cost";
                                        } else if (ser_mate == "Service") {
                                            loc = "Extended Price"
                                        }

                                        if ("rollupTermList" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q]) {
                                            if (shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList.length != 0) {
                                                for (let l = 0; l < shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList.length; l++) {
                                                    if (shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList[l].title == loc) {
                                                        if ("value" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList[l]) {
                                                            if ("moneyValue" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList[l].value) {
                                                                if ("amount" in shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList[l].value.moneyValue) {
                                                                    vendor_loc = shrt_lst_count.payload[r].scenarioSummary.participantSummaryList[q].rollupTermList[l].value.moneyValue.amount;

                                                                }
                                                            }
                                                        }

                                                    }

                                                }
                                            }
                                        }
                                        var acc_ind = 0;
                                        var orinv_id = "";
                                        var ordates = [];
                                        var ordates1 = [];
                                        if (vendorids1.length != 0) {
                                            for (let v = 0; v < vendorids1.length; v++) {
                                                if (vendorids1[v].smvendor_id == sm_id && vendorids1[v].doc_id == no_of_docs.doc_id) {
                                                    orinv_id = vendorids1[v].vinv_id;
                                                    console.log(orinv_id);
                                                }
                                            }
                                        }
                                        if (version1.length != 0) {
                                            for (let vr = 0; vr < version1.length; vr++) {
                                                if (version1[vr].inv_id == orinv_id && version1[vr].PAN_Number == no_of_docs.doc_id) {
                                                    ordates.push(version1[vr].sub_date);
                                                    acc_ind = 1;
                                                }
                                            }
                                        }

                                        if (acc_ind == 1 && version1.length != 0) {
                                            var orsmdate = ordates.reduce((acc, curr) => curr < acc ? curr : acc, ordates[0]);

                                            for (let j = 0; j < version1.length; j++) {
                                                if (version1[j].sub_date == orsmdate && version1[j].PAN_Number == no_of_docs.doc_id) {
                                                    original_quote = version1[j].final_quote;
                                                    // original_quote1 = returnamt(original_quote);
                                                }
                                            }
                                        } else if (acc_ind == 0) {
                                            original_quote = 0;
                                            for (let f = 0; f < final_quotearr.length; f++) {
                                                if (final_quotearr[f].sm_id == sm_id && final_quotearr[f].PAN_Number == no_of_docs.doc_id) {
                                                    ordates1.push(final_quotearr[f].sub_date);
                                                }


                                            }
                                            var orsmdate1 = ordates1.reduce((acc, curr) => curr < acc ? curr : acc, ordates1[0]);
                                            for (let f = 0; f < final_quotearr.length; f++) {
                                                if (final_quotearr[f].sub_date == orsmdate1 && final_quotearr[f].PAN_Number == no_of_docs.doc_id) {
                                                    original_quote = final_quotearr[f].final_quote;
                                                    break;
                                                }

                                            }
                                        }





                                        for (let f = 0; f < final_quotearr.length; f++) {
                                            if (final_quotearr[f].PAN_Number == no_of_docs.doc_id) {
                                                if (final_quotearr[f].sm_id == sm_id) {
                                                    final_quote1 = final_quotearr[f].final_quote
                                                    final_quote1 = final_quotearr[f].final_quote

                                                }
                                            }

                                        }


                                        if (final_quote1 != 0) {
                                            discount_amt = original_quote - final_quote1;
                                            // var str = discount_amt.toString();
                                            // discount_amt = Math.abs(discount_amt)
                                            discount_amt = discount_amt.toFixed(2)
                                            discount_amt2 = returnamt(discount_amt);

                                            dis_per = ((original_quote - final_quote1) / final_quote1) * 100;
                                            //  dis_per = Math.abs(dis_per);
                                            dis_per = dis_per.toFixed(2);
                                            dis_per = dis_per + " %";
                                        }

                                        if (tec_rank.length != 0) {
                                            for (let t = 0; t < tec_rank.length; t++) {
                                                if (tec_rank[t].PAN_Number == no_of_docs.doc_id) {
                                                    if (tec_rank[t].Proposed_vendor_code == sm_id) {
                                                        trank = tec_rank[t].techrank;
                                                        tapp = tec_rank[t].techacc;
                                                    }
                                                }
                                            }
                                        }
                                        //VENDORS WHO ALL ARE AWARDED

                                        vendordata1.push({
                                            Proposed_Vendor_Code: `${sm_id}`, //disp
                                            PAN_Number: `${no_of_docs.doc_id}`,
                                            Awarded_Vendor: "YES",
                                            Vendor_Name: `${vname}`,//disp
                                            Vendor_Location: `${trank}`,
                                            Technically_Approved: `${tapp}`,
                                            Original_quote: `${returnamt(original_quote)}`,//disp
                                            Final_Quote: `${returnamt(final_quote1)}`, //disp
                                            Order_amount_OR_Split_order_amount: `${returnamt(vendor_loc)}`,
                                            Discount_Amount: `${discount_amt2}`,
                                            Discount_percentage: `${dis_per}`,
                                            Rank: "1",

                                        })
                                        vname = "";
                                        vendor_loc = 0;
                                        original_quote1 = 0;
                                        final_quote1 = 0;
                                        original_quote = 0;
                                        // final_quote=0;
                                        discount_amt2 = 0;
                                        dis_per = 0;
                                        discount_amt = 0;

                                        console.log("stage5.4")
                                    }

                                }
                            }
                            awarded_vendor = "YES";
                            for (let k = 0; k < shrt_lst_count.payload[r].supplierBids.length; k++) {
                                if (ser_mate == "Material" || ser_mate == "Both") {
                                    if (shrt_lst_count.payload[r].supplierBids[k].item.title != "Totals" && shrt_lst_count.payload[r].supplierBids[k].item.title != "services") {
                                        var terms3 = [];
                                        if ("terms" in shrt_lst_count.payload[r].supplierBids[k].item) {
                                            terms3 = shrt_lst_count.payload[r].supplierBids[k].item.terms;
                                        }


                                        var pvcode1 = "";
                                        for (let v = 0; v < vendorids1.length; v++) {
                                            if (shrt_lst_count.payload[r].supplierBids[k].invitationId == vendorids1[v].vinv_id && vendorids1[v].doc_id == no_of_docs.doc_id) {
                                                pvcode1 = vendorids1[v].pvcode;
                                            }
                                        }


                                        if (terms3.length != 0) {
                                            for (let it = 0; it < terms3.length; it++) {
                                                var value2 = "value";
                                                if (terms3[it].title == "HSNCode" || terms3[it].title == "SACCode") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        SACCode = terms3[it].value.simpleValue;
                                                    } else {
                                                        SACCode = "";
                                                    }
                                                }


                                                if (terms3[it].fieldId == "MaterialCode") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        ItemCode = terms3[it].value.simpleValue;
                                                        let match = ItemCode.match(/^\d+/);
                                                        let output = match ? match[0] : null;
                                                        ItemCode = output;
                                                    } else {
                                                        ItemCode = "";
                                                    }
                                                }


                                                if (terms3[it].title == "Quantity") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        UOM = terms3[it].value.quantityValue.unitOfMeasureName;
                                                        Quantity = terms3[it].value.quantityValue.amount;
                                                        Quantity = Quantity.toLocaleString('en-US');
                                                    } else {
                                                        Quantity = "";
                                                    }
                                                }
                                                if (terms3[it].title == "Total Cost") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        l1Amount = l1Amount + terms3[it].value.moneyValue.amount;
                                                        bid_currency = terms3[it].value.supplierValue.currency;
                                                        l3Amount = terms3[it].value.moneyValue.amount;
                                                        var l4Amount = l3Amount;
                                                        l3Amount = returnamt(l3Amount);
                                                    } else {
                                                        l1Amount = 0;
                                                        bid_currency = "";
                                                        l3Amount = 0;
                                                    }
                                                }


                                                if (terms3[it].title == "Price") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        UnitPrice = terms3[it].value.supplierValue.currency;
                                                        Amount = terms3[it].value.supplierValue.amount;
                                                        if (UnitPrice == "INR") {
                                                            Amount = Amount.toLocaleString('en-IN');
                                                        }
                                                        if (UnitPrice == "USD") {
                                                            Amount = Amount.toLocaleString('en-US');
                                                        }
                                                    }
                                                    else {
                                                        UnitPrice = "";
                                                        Amount = "";

                                                    }
                                                }

                                                if (terms3[it].title == "Extended Price") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        extend_price = terms3[it].value.moneyValue.amount;
                                                        extend_price = returnamt(extend_price);
                                                    }
                                                    else {
                                                        extend_price = "";
                                                    }
                                                }
                                                if (terms3[it].title == "Delivery Schedule - Quantity") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        delivery_schedule = terms3[it].value.simpleValue;
                                                    }
                                                    else {
                                                        delivery_schedule = "";
                                                    }
                                                }

                                                if (terms3[it].title == "Delivery Schedule - Date") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {

                                                        delivery_schedule1 = terms3[it].value.simpleValue;
                                                        if (delivery_schedule != "") {
                                                            delivery_schedule = delivery_schedule + " " + delivery_schedule1;
                                                        }

                                                    }
                                                    else {
                                                        delivery_schedule = ""
                                                    }

                                                }

                                                if (terms3[it].title == "Quantity Over Delivery Tolerance") {


                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        tolerence = terms3[it].value.simpleValue;
                                                    } else {
                                                        tolerence = ""
                                                    }

                                                }


                                                if (terms3[it].title == "Delivery Date") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        var date_obj = terms3[it].value.dateValue;
                                                        date_obj = new Date(date_obj);
                                                        delivery_date = date_obj.toISOString().split('T')[0];
                                                        delivery_date = returndate(delivery_date);
                                                    } else {
                                                        delivery_date = ""
                                                    }
                                                }


                                                if (terms3[it].title == "Tax") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        IndianTaxPER = terms3[it].value.simpleValue;
                                                    } else {
                                                        IndianTaxPER = ""
                                                    }
                                                }


                                            }
                                        }

                                        price_details.push({
                                            Proposed_Vendor_Code: `${pvcode1}`,
                                            PAN_Number: `${no_of_docs.doc_id}`,
                                            Item_Code: `${ItemCode}`,
                                            PAN_Number: `${no_of_docs.doc_id}`,
                                            HSN_OR_SAC_Code: `${SACCode}`,
                                            Item_Short_Description: `${shrt_lst_count.payload[r].supplierBids[k].item.title}`,
                                            UOM: `${UOM}`,
                                            Quantity: `${Quantity}`,
                                            Unit_Price: `${Amount}`,
                                            Amount: `${l3Amount}`,
                                            extendedPrice: `${extend_price}`,
                                            Indian_Tax_PER: `${IndianTaxPER}`,
                                            Quantity_Over_Delivery_Tolerance: `${tolerence}`,

                                        })
                                        item_details.push({
                                            item_name: shrt_lst_count.payload[r].supplierBids[k].item.title,
                                            inv_id: shrt_lst_count.payload[r].supplierBids[k].invitationId,
                                            allocation_type: shrt_lst_count.payload[r].supplierBids[k].winningSplitType,
                                            allocate_per: shrt_lst_count.payload[r].supplierBids[k].winningSplitValue,
                                            // totl_amt : shrt_lst_count.payload[r].supplierBids[k].item.terms[0].value.moneyValue.amount
                                            totl_amt: `${l4Amount}`,
                                        })

                                        SACCode = "";
                                        ItemCode = "";
                                        ItemShortDescription = "";
                                        UOM = "";
                                        Quantity = "";
                                        Amount = "";
                                        l4Amount = "";
                                        extend_price = "";
                                        IndianTaxPER = "";
                                        tolerence = "";




                                    }
                                }
                                else if (ser_mate == "Service") {
                                    if (shrt_lst_count.payload[r].supplierBids[k].item.title != "Totals" && shrt_lst_count.payload[r].supplierBids[k].item.itemType == 5) {
                                        var terms3 = [];
                                        if ("terms" in shrt_lst_count.payload[r].supplierBids[k].item) {
                                            terms3 = shrt_lst_count.payload[r].supplierBids[k].item.terms;
                                        }


                                        item_details.push({
                                            item_name: shrt_lst_count.payload[r].supplierBids[k].item.title,
                                            inv_id: shrt_lst_count.payload[r].supplierBids[k].invitationId,
                                            allocation_type: shrt_lst_count.payload[r].supplierBids[k].winningSplitType,
                                            allocate_per: shrt_lst_count.payload[r].supplierBids[k].winningSplitValue,
                                            totl_amt: shrt_lst_count.payload[r].supplierBids[k].item.terms[0].value.moneyValue.amount
                                        })

                                        var pvcode1 = "";
                                        for (let v = 0; v < vendorids1.length; v++) {
                                            if (shrt_lst_count.payload[r].supplierBids[k].invitationId == vendorids1[v].vinv_id && vendorids1[v].doc_id == no_of_docs.doc_id) {
                                                pvcode1 = vendorids1[v].pvcode;
                                            }
                                        }

                                        if (terms3.length != 0) {
                                            for (let it = 0; it < terms3.length; it++) {
                                                var value2 = "value";
                                                if (terms3[it].title == "HSNCode") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        SACCode = terms3[it].value.simpleValue;
                                                    } else {
                                                        SACCode = "";
                                                    }
                                                }


                                                if (terms3[it].title == "Material Code") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        ItemCode = terms3[it].value.simpleValue;
                                                        let match = ItemCode.match(/^\d+/);
                                                        let output = match ? match[0] : null;
                                                        ItemCode = output;
                                                    } else {
                                                        ItemCode = "";
                                                    }
                                                }


                                                if (terms3[it].title == "Quantity") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        UOM = terms3[it].value.quantityValue.unitOfMeasureName;
                                                        Quantity = terms3[it].fromValue.quantityValue.amount;
                                                        Quantity = Quantity.toLocaleString('en-US');
                                                    } else {
                                                        Quantity = "";
                                                    }
                                                }
                                                if (terms3[it].title == "Total Cost") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        l1Amount = l1Amount + terms3[it].value.moneyValue.amount;
                                                        bid_currency = terms3[it].value.supplierValue.currency;
                                                        l3Amount = terms3[it].value.moneyValue.amount;
                                                        l4Amount = returnamt(l3Amount);
                                                    } else {
                                                        l1Amount = 0;
                                                        bid_currency = "";
                                                        l3Amount = 0;
                                                    }
                                                }


                                                if (terms3[it].title == "Extended Price") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        UnitPrice = terms3[it].value.supplierValue.currency;
                                                        Amount = terms3[it].value.supplierValue.amount;
                                                        if (UnitPrice == "INR") {
                                                            Amount = Amount.toLocaleString('en-IN');
                                                            Amount = returnamt(Amount);
                                                        }
                                                        if (UnitPrice == "USD") {
                                                            Amount = Amount.toLocaleString('en-US');
                                                            Amount = returnamt(Amount);
                                                        }
                                                    }
                                                    else {
                                                        UnitPrice = "";
                                                        Amount = "";

                                                    }
                                                }

                                                if (terms3[it].title == "Delivery Schedule - Quantity") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        delivery_schedule = terms3[it].value.simpleValue;
                                                    }
                                                    else {
                                                        delivery_schedule = "";
                                                    }
                                                }

                                                if (terms3[it].title == "Delivery Schedule - Date") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {

                                                        delivery_schedule1 = terms3[it].value.simpleValue;
                                                        if (delivery_schedule != "") {
                                                            delivery_schedule = delivery_schedule + " " + delivery_schedule1;
                                                        }
                                                        final_quotear
                                                    }
                                                    else {
                                                        delivery_schedule = ""
                                                    }

                                                }

                                                if (terms3[it].title == "Quantity Over Delivery Tolerance") {


                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        tolerence = terms3[it].value.simpleValue;
                                                    } else {
                                                        tolerence = ""
                                                    }

                                                }

                                                if (terms3[it].title == "Delivery Date") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        var date_obj = terms3[it].value.dateValue;
                                                        date_obj = new Date(date_obj);
                                                        delivery_date = date_obj.toISOString().split('T')[0];
                                                        delivery_date = returndate(delivery_date);
                                                    } else {
                                                        delivery_date = ""
                                                    }

                                                }


                                                if (terms3[it].title == "Tax") {
                                                    if (Object.keys(terms3[it]).includes(value2)) {
                                                        IndianTaxPER = terms3[it].value.simpleValue;
                                                    } else {
                                                        IndianTaxPER = ""
                                                    }
                                                }


                                            }
                                        }

                                        price_details.push({
                                            Proposed_Vendor_Code: `${pvcode1}`,
                                            PAN_Number: `${no_of_docs.doc_id}`,
                                            Item_Code: `${shrt_lst_count.payload[r].supplierBids[k].item.title}`,
                                            PAN_Number: `${no_of_docs.doc_id}`,
                                            HSN_OR_SAC_Code: `${SACCode}`,
                                            Item_Short_Description: `${shrt_lst_count.payload[r].supplierBids[k].item.title}`,
                                            UOM: `${UOM}`,
                                            Quantity: `${Quantity}`,
                                            Unit_Price: `${Amount}`,
                                            Amount: `${Amount}`,
                                            extendedPrice: `${Amount}`,
                                            Indian_Tax_PER: `${IndianTaxPER}`,
                                            Quantity_Over_Delivery_Tolerance: `${tolerence}`,

                                        })

                                        SACCode = "";
                                        ItemCode = "";
                                        ItemShortDescription = "";
                                        UOM = "";
                                        Quantity = "";
                                        Amount = "";
                                        l4Amount = "";
                                        extend_price = "";
                                        IndianTaxPER = "";
                                        tolerence = "";





                                    }

                                }

                            }
                        }
                        else {
                            awarded_vendor = "NO"
                        }
                    }
                }
                var save1 = 0;
                var amt2 = 0;
                var per_value = 0;
                var weind = "";
                var web_ind = 0;
                for (let w = 0; w < pan_web_event.length; w++) {
                    if (pan_web_event[w].number.substring(0, 11) == no_of_docs.doc_id) {
                        web_ind = web_ind + 1;
                        weind = pan_web_event[w].eventNo
                        // if(pan_web_event[w].eventNo == "Last Published(Before RA)" && l1AmountObtained == 0 || pan_web_event[w].eventNo == "Last Published(Before RA)" && l1AmountObtained == 0 || pan_web_event[w].eventNo == "Last Published(Before RA)" && l1AmountObtained == 0  )
                    }
                }

                // if (web_ind == 2 && weind == "Last Published(Before RA)") {
                //     pan_web_event[1].l1AmountObtained = `${final_quote}`
                // } else if (web_ind == 2 && weind == "Reverse Auction(RA)") {
                //     pan_web_event[2].l1AmountObtained = `${final_quote}`
                // }
                // else if (web_ind == 1) {
                //     for (let w = 0; w < pan_web_event.length; w++) {
                //         if (pan_web_event[w].number.substring(0,11) == no_of_docs.doc_id) {
                //             pan_web_event[w].l1AmountObtained = `${final_quote}`;
                //         }
                //     }
                // }
                for (let v = 0; v < pan_vendor_response.length; v++) {
                    for (let f = 0; f < final_quotearr.length; f++) {
                        if (pan_vendor_response[v].PAN_Number == no_of_docs.doc_id && final_quotearr[f].PAN_Number == no_of_docs.doc_id) {
                            if (pan_vendor_response[v].Proposed_Vendor_Code == final_quotearr[f].Proposed_vendor_code) {

                                pan_vendor_response[v].Vendor_Final_Quotation_Amount = returnamt(final_quotearr[f].final_quote)

                            }
                        }

                    }
                }



                for (let k = 0; k < pan_vendor_response.length; k++) {
                    for (let p = 0; p < vendordata1.length; p++) {
                        // for(let f=0;f<final_quotearr.length;f++){
                        if (pan_vendor_response[k].PAN_Number == no_of_docs.doc_id) {
                            if (pan_vendor_response[k].Proposed_Vendor_Code == vendordata1[p].Proposed_Vendor_Code) {

                                pan_vendor_response[k].Order_Value_BKTIn_Project_CurrencyBKT = `${vendordata1[p].Order_amount_OR_Split_order_amount}`;
                                pan_vendor_response[k].Order_Value_BKTIn_Bid_CurrencyBKT = `${vendordata1[p].Order_amount_OR_Split_order_amount}`;

                            }

                        }
                    }
                }

                var savings1 = baselinespend - final_quote;
                //  savings1  = Math.abs(savings1);
                savings1 = savings1.toFixed(2)
                savings1 = returnamt(savings1)
                //  discount_amt1  =   final_quote - pan_web_event[0].l1AmountObtained;
                if (pan_web_event.length != 1 && pan_web_event.length != 0) {
                    // if (pan_web_event[2].number.substring(0,11) != "NA") {
                    //     discount_amt1 = pan_web_event[0].l1AmountObtained - pan_web_event[2].l1AmountObtained;
                    // }
                    // else
                    if (pan_web_event[1].number.substring(0, 11) != "NA") {
                        discount_amt1 = pan_web_event[0].l1AmountObtained - pan_web_event[1].l1AmountObtained;
                    }
                    else if (pan_web_event[0].number.substring(0, 11) != "NA") {
                        discount_amt1 = pan_web_event[0].l1AmountObtained;
                    }

                    discount_amt1 = Math.abs(discount_amt1)
                    discount_amt1 = discount_amt1.toFixed(2)
                    discount_amt1 = returnamt(discount_amt1);

                }
                else {
                    discount_amt1 = 0;
                }
                for (let t = 0; t < panheader.length; t++) {
                    if (panheader[t].PAN_Number == no_of_docs.doc_id) {
                        panheader[t].Savings_achieved_btw_initial_and_final_quote = `${discount_amt1}`;
                        panheader[t].Savings_against_base_line_spend_of_RFP = `${savings1}`;
                        panheader[t].Final_proposed_Value = `${returnamt(final_quote)}`;
                        panheader[t].Required_at_Site_Date = `${delivery_date}`;

                    }
                }
                console.log("stage5.7")

                var vendordata3 = [];
                var ven_ind;
                var ven_ind1;
                vendordata3 = JSON.parse(JSON.stringify(vendordata1));
                for (let m = 0; m < vendor_data.length; m++) {
                    ven_ind = 0;
                    ven_ind1 = 0;
                    for (let m1 = 0; m1 < vendordata1.length; m1++) {
                        if ((vendor_data[m].PAN_Number == no_of_docs.doc_id && vendor_data[m].Proposed_Vendor_Code != vendordata1[m1].Proposed_Vendor_Code) || vendor_data[m].PAN_Number != no_of_docs.doc_id) {
                            //  vendordata3.push(vendor_data[m])
                            ven_ind = 1;
                        }

                        else {
                            ven_ind1 = 1;
                        }
                    }
                    if (ven_ind == 1 && ven_ind1 == 0) {
                        vendordata3.push(vendor_data[m])
                    }
                }

                if (vendordata3.length != 0 && final_quotearr.length != 0) {
                    for (let k = 0; k < vendordata3.length; k++) {
                        if (vendordata3[k].Awarded_Vendor == "NO" && vendordata3[k].PAN_Number == no_of_docs.doc_id) {
                            na_date = []
                            na_ind = 0;
                            for (let k1 = 0; k1 < version1.length; k1++) {
                                if (version1[k1].Proposed_vendor_code == vendordata3[k].Proposed_Vendor_Code && version1[k1].PAN_Number == no_of_docs.doc_id) {
                                    pcod = vendordata3[k].Proposed_Vendor_Code;
                                    // vendordata3[k].Original_quote = returnamt(version1[k1].final_quote);
                                    na_date.push(version1[k1].sub_date)
                                    na_ind = 1;
                                }
                            }

                            if (na_ind == 1) {
                                na_smdate = na_date.reduce((acc, curr) => curr < acc ? curr : acc, na_date[0]);
                                na_date = [];
                                if (vendordata3.length != 0 && final_quotearr.length != 0) {
                                    for (let k = 0; k < vendordata3.length; k++) {
                                        if (vendordata3[k].Awarded_Vendor == "NO" && vendordata3[k].PAN_Number == no_of_docs.doc_id) {

                                            for (let k1 = 0; k1 < version1.length; k1++) {
                                                if (version1[k1].Proposed_vendor_code == vendordata3[k].Proposed_Vendor_Code && version1[k1].PAN_Number == no_of_docs.doc_id) {
                                                    if (version1[k1].sub_date == na_smdate) {
                                                        vendordata3[k].Original_quote = returnamt(version1[k1].final_quote);
                                                    }


                                                }
                                            }
                                        }
                                    }
                                }

                            }

                            else if (na_ind == 0) {
                                if (vendordata3.length != 0 && final_quotearr.length != 0) {
                                    for (let k = 0; k < vendordata3.length; k++) {
                                        if (vendordata3[k].Awarded_Vendor == "NO" && vendordata3[k].PAN_Number == no_of_docs.doc_id) {
                                            for (let k1 = 0; k1 < final_quotearr.length; k1++) {
                                                if (final_quotearr[k1].Proposed_vendor_code == vendordata3[k].Proposed_Vendor_Code) {
                                                    vendordata3[k].Original_quote = returnamt(final_quotearr[k1].final_quote);
                                                }
                                            }
                                        }
                                    }
                                }
                            }


                        }
                    }
                }

                for (let j = 0; j < vendordata3.length; j++) {
                    if (vendordata3[j].Original_quote == "NaN") {
                        vendordata3[j].Original_quote = "0";
                    }
                    if (vendordata3[j].Awarded_Vendor == "YES") {
                        tec_app = tec_app + 1;
                    }



                }

                for (let p = 0; p < panheader.length; p++) {
                    if (panheader[p].PAN_Number == no_of_docs.doc_id) {
                        panheader[p].number_of_Vendors_Technically_Qualified = `${tec_app}`
                    }
                }


                for (let k = 0; k < pan_web_event.length; k++) {
                    if (pan_web_event[k].number.substring(0, 11) != "NA") {
                        pan_web_event[k].l1AmountObtained = returnamt(pan_web_event[k].l1AmountObtained);
                    }
                }
                console.log("stage6")
                var doc_id_fornow = "";



                console.log("succes till the data pushes");

                if (panheader.length != 0) {
                    for (let j = 0; j < panheader.length; j++) {
                        let body3 = JSON.parse(JSON.stringify(panheader[j]));
                        let re = await SELECT.from(PAN_Details_APR).where`PAN_Number=${body3.PAN_Number}`;
                        let re1 = re[0];
                        if (re.length != 0) {
                            let num = body3.PAN_Number;
                            delete body3.PAN_Number;
                            let put = await UPDATE(PAN_Details_APR, num).with(body3);
                            console.log(put);
                        } else {
                            let r = await INSERT.into(PAN_Details_APR).entries(body3);
                            console.log(r);
                        }
                    }
                }

                if (pan_web_event.length != 0) {
                    for (let j = 0; j < pan_web_event.length; j++) {
                        let bodyA = JSON.parse(JSON.stringify(pan_web_event[j]));
                        let we = await SELECT.from(PAN_WEB_EVENT_APR).where`PAN_Number=${bodyA.PAN_Number} and idd = ${bodyA.idd}`;
                        if (we.length != 0) {
                            delete bodyA.PAN_Number;
                            delete bodyA.idd;
                            let webput = await UPDATE(PAN_WEB_EVENT_APR, ({
                                PAN_Number: pan_web_event[j].PAN_Number,
                                idd: pan_web_event[j].idd
                            })).with(bodyA);
                            console.log(webput);
                        } else {
                            const response_p = await INSERT.into(PAN_WEB_EVENT_APR).entries(bodyA);
                            console.log(response_p);
                        }
                    }
                }

                if (payment_details.length != 0) {
                    for (let j = 0; j < payment_details.length; j++) {
                        let body4 = JSON.parse(JSON.stringify(payment_details[j]));
                        let pd = await SELECT.from(PAN_PAYMENT_TERM_DETAILS_APR).where`PAN_Number=${body4.PAN_Number} and iddd = ${body4.iddd} and Proposed_Vendor_Code = ${body4.Proposed_Vendor_Code}`;
                        if (pd.length != 0) {
                            delete body4.PAN_Number;
                            delete body4.iddd;
                            delete body4.Proposed_Vendor_Code;
                            let uppd = await UPDATE(PAN_PAYMENT_TERM_DETAILS_APR, ({
                                PAN_Number: payment_details[j].PAN_Number,
                                iddd: payment_details[j].iddd,
                                Proposed_Vendor_Code: payment_details[j].Proposed_Vendor_Code
                            })).with(body4);
                            console.log(uppd);
                        } else {
                            let pdins = await INSERT.into(PAN_PAYMENT_TERM_DETAILS_APR).entries(body4);
                            console.log(pdins);
                        }
                    }
                }

                if (vendordata3.length != 0) {
                    for (let j = 0; j < vendordata3.length; j++) {
                        if (pan_vendor_response.length != 0) {
                            for (let r = 0; r < pan_vendor_response.length; r++) {
                                if (vendordata3[j].PAN_Number == pan_vendor_response[r].PAN_Number && vendordata3[j].Proposed_Vendor_Code == pan_vendor_response[r].Proposed_Vendor_Code) {
                                    res_body = JSON.parse(JSON.stringify(pan_vendor_response[r]));
                                }
                            }

                        }
                        let body6 = JSON.parse(JSON.stringify(vendordata3[j]));
                        let vd = await SELECT.from(PAN_vendor_data_APR).where`PAN_Number = ${body6.PAN_Number} and Proposed_Vendor_Code=${body6.Proposed_Vendor_Code}`;
                        delete res_body.PAN_Number;
                        delete res_body.Proposed_Vendor_Code;
                        let fin_body = {
                            ...vendordata3[j],
                            ...res_body
                        }
                        if (vd.length != 0) {
                            delete body6.PAN_Number;
                            delete body6.Proposed_Vendor_Code;

                            let vdput = await UPDATE(PAN_vendor_data_APR, ({
                                PAN_Number: vendordata3[j].PAN_Number,
                                Proposed_Vendor_Code: vendordata3[j].Proposed_Vendor_Code
                            })).with(fin_body);
                            console.log(vdput);
                        } else {
                            const response_p = await INSERT.into(PAN_vendor_data_APR).entries(fin_body);
                            console.log(response_p);
                        }

                    }
                }

                if (pan_vendor_response != 0) {
                    for (let j = 0; j < pan_vendor_response.length; j++) {
                        let body5 = JSON.parse(JSON.stringify(pan_vendor_response[j]));
                        let pdr = await SELECT.from(PAN_vendor_response_APR).where`PAN_Number = ${body5.PAN_Number} and Proposed_Vendor_Code=${body5.Proposed_Vendor_Code}`;
                        if (pdr.length != 0) {
                            delete body5.PAN_Number;
                            delete body5.Proposed_Vendor_Code;
                            let pvr = await UPDATE(PAN_vendor_response_APR, ({
                                PAN_Number: pan_vendor_response[j].PAN_Number,
                                Proposed_Vendor_Code: pan_vendor_response[j].Proposed_Vendor_Code
                            })).with(body5);
                            console.log(pvr);
                        } else {
                            const response_p = await INSERT.into(PAN_vendor_response_APR).entries(body5);
                            console.log(response_p);
                        }
                    }
                }

                var qind = 0;
                var body7
                if (price_details.length != 0) {
                    for (let j = 0; j < price_details.length; j++) {
                        if (price_details[j].Item_Code != " ") {
                            body7 = JSON.parse(JSON.stringify(price_details[j]));
                            let pd = await SELECT.from(PAN_PRICE_DETAILS_APR).where`PAN_Number = ${body7.PAN_Number} and Proposed_Vendor_Code = ${body7.Proposed_Vendor_Code} and Item_Code = ${body7.Item_Code}`;
                            let del = await DELETE.from(PAN_PRICE_DETAILS_APR).where`PAN_Number = ${body7.PAN_Number} and Proposed_Vendor_Code = ${body7.Proposed_Vendor_Code} and Item_Code = ${body7.Item_Code}`;
                        }
                    }
                    let pd = await SELECT.from(PAN_PRICE_DETAILS_APR);
                    for (let j = 0; j < price_details.length; j++) {
                        body7 = JSON.parse(JSON.stringify(price_details[j]));
                        const response_p = await INSERT.into(PAN_PRICE_DETAILS_APR).entries(body7);
                        console.log(response_p);
                    }
                }

                if (vendortaxdetails.length != 0) {
                    for (let j = 0; j < vendortaxdetails.length; j++) {
                        let body8 = JSON.parse(JSON.stringify(vendortaxdetails[j]));
                        vtd = await SELECT.from(vendorTaxDetails_APR).where`PAN_Number = ${body8.PAN_Number} and Proposed_Vendor_Code = ${body8.Proposed_Vendor_Code} and Item_Code = ${body8.Item_Code}`;
                        if (vtd.length != 0) {
                            delete body8.PAN_Number;
                            delete body8.Proposed_Vendor_Code;
                            delete body8.Item_Code;
                            let putvtd = await UPDATE(vendorTaxDetails_APR, ({
                                PAN_Number: vendortaxdetails[j].PAN_Number,
                                Proposed_Vendor_Code: vendortaxdetails[j].Proposed_Vendor_Code,
                                Item_Code: vendortaxdetails[j].Item_Code
                            })).with(body8);
                            console.log(putvtd);
                        } else {
                            const response_tax = await INSERT.into(vendorTaxDetails_APR).entries(body8);
                            console.log(response_tax);
                        }

                    }
                }

                //CLEARING ALL THE ARRAYS

                projects_docs = [];
                panheader = [];
                pan_web_event = [];
                pan_type = [];
                payment_details = [];
                // vendordata = [];
                pan_vendor_response = [];
                price_details = [];
                console.log("final code")
                // }
                return no_of_docs.doc_id;
            }
            catch (e) {
                if ("message" in e) {
                    console.log(e.message);
                    return e.message;
                } else {
                    return e;
                }

            }




        });
        this.before('READ', 'PAN_Details_APR', async (req) => {
            debugger


        });

    });
} else {
    async function work() {
        var ariba = await cds.connect.to('ariba');
        try {
            let body = {
                basis: workerData.basis,
                query: workerData.query,
                url: workerData.url
            };
            var res = await ariba.post('/', body);
            res.path = workerData.path;
            parentPort.postMessage(res);
        } catch (error) {
            parentPort.postMessage(error);
        }
    }
    work();

}
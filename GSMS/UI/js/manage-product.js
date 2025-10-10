var productModal = $("#addProductModal");


  $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span><button class="btn btn-primary edit-product ms-2">Edit</button></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Save Product
    $("#saveProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            product_name: null,
            uom_id: null,
            price_per_unit: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.product_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }
    const productId = $("#id").val();

    if (productId && productId !== '0') {
        // 🟢 Update existing product
        requestPayload.product_id = productId;
        callApi("POST", productEditApiUrl, { data: JSON.stringify(requestPayload) });
    } else {
        // 🆕 Add new product
        callApi("POST", productSaveApiUrl, { data: JSON.stringify(requestPayload) });
    }
});

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    $(document).on("click",".edit-product", function (){
    var tr = $(this).closest('tr');

    // Get data from table row
        var productId = tr.data('id');
        var productName = tr.data('name');
        var uomId = tr.data('unit');
        var price = tr.data('price');

        // Fill form fields in modal
        $("#id").val(productId);
        $("#Product-name").val(productName);
        $("#uom").val(uomId);
        $("#Price").val(price);

        // Change modal title and show it
        productModal.find('.modal-title').text('Edit Product');
        productModal.modal('show');
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#Product-name, #uom, #Price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });
    

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.uom_name +'</option>';
                });
                $("#uom").empty().html(options);
            }
        });
    });
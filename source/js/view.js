function construct_view_page() {
  let data = get_selected_data();
  document.getElementById("recipe-name").innerHTML = data.name;
  document.getElementById("recipe-ingredients").innerHTML = data.ingredients;
  document.getElementById("recipe-preparation").innerHTML = data.preparation;
  document.getElementById("recipe-notes").innerHTML = data.notes;

  document.getElementById("view-page-add-button").addEventListener('click', function(event) {
    window.location.href = "edit-page.html";
  });

  document.getElementById("view-page-delete-button").addEventListener('click', function(event) {
    delete_selected_data();
    window.location.href = "home.html";
  });

  
}

window.onload = construct_view_page;

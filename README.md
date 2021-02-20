# Void Notes

## Description 
Void Notes is a web application for temporary and anonymous notes. When a user visits the site, a new notebook is created with a randomized alphanumeric ID. This ID is the only means of accessing the notebook. If the notebook is not accessed for 30 days it will be deleted. The notebook ID will be stored in the browsers cookies for easier access. If no cookie is found, an input field will allow loading a notebook by it's ID.

## User Experience
This is the planned ux as of (02/19/21).

- Display a 'login' view
    - The user has the option to enter a previous notebook ID or...
    - The user can create a new notebook.
- If the user enters a valid ID, the notebook is loaded with all previous notes.
- If a new notebook is created a blank notebook will be shown.
- The user has the option to create a new note.
    - A note can include an optional title.
    - A note has a minimum and maximum amount of characters (1-1000?)
    - When a note is saved, the text is stored in db (notes table) with a unique id# as key.
        - Each note is saved along with it's notebook ID.
        - Creation time is also saved per note.
        - Meta column can save data of extra note properties as json.
        - Ex. Notes Table: id | notebook_id | title | text | created | meta
- The user can delete notes in their notebook.
    - Once deleted, the note cannot be recovered and is removed from the db.
- The notebook db table will store the notebook ID, expiration and last login time.
    - The user can delete an entire notebook if they choose. Will be presented with a warning beforehand.

## Optional Features
These are features that may or may not be implemented at some point.

- Allow setting the expiration of the notebook to different values (e.g. 1, 7, 30, 60 or 90 days.)
- Allow sorting notes within a notebook.
- Search notes, both in the title and
- Use markdown for note formatting.
- Star or favorite notes.
- Share a single note with a url.
- TODO list.

## Typical Usage and Security

This application is not designed to handle secure or sensitive data (passwords, logins, etc) and should not be used for that purpose. I provide no guarantees or warranty for the security of data submitted or stored in any part of the app.

## Contribution

If you'd like to contribute to this project or provide feedback, please message me on [GitHub](https://github.com/d-spence).

## License

This software is licensed under the terms of the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).

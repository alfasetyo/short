-- Tabel untuk menyimpan shortlink
create table if not exists links (
  id serial primary key,
  code text unique,
  url text not null
);

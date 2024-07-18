-- PostgreSQL database dump

-- Dumped from database version 15.7 (Ubuntu 15.7-0ubuntu0.23.10.1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-0ubuntu0.23.10.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: usuario
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    usuario character varying(255) NOT NULL,
    contrasena character varying(20) NOT NULL,
    personalizaciones_id integer
);

ALTER TABLE public.usuarios OWNER TO usuario;

--
-- Name: personalizaciones; Type: TABLE; Schema: public; Owner: usuario
--

CREATE TABLE public.personalizaciones (
    id integer NOT NULL,
    viento boolean,
    lluvia boolean,
    humedad boolean,
    temperatura boolean,
    sensacionTermica boolean
);

ALTER TABLE public.personalizaciones OWNER TO usuario;

--
-- Name: personalizaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: usuario
--

CREATE SEQUENCE public.personalizaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.personalizaciones_id_seq OWNER TO usuario;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: usuario
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.usuarios_id_seq OWNER TO usuario;

--
-- Name: personalizaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: usuario
--

SELECT pg_catalog.setval('public.personalizaciones_id_seq', 1, false);

--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: usuario
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, false);

--
-- Name: personalizaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.personalizaciones
    ADD CONSTRAINT personalizaciones_pkey PRIMARY KEY (id);

--
-- Name: usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: usuario
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);

--
-- End of dump
--

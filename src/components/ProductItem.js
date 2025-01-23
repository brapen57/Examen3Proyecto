const ProductItem = ({ product, onViewApoderado, onViewMatricula }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <p><strong>Nombre:</strong> {product.nombre}</p>
                <p><strong>Edad:</strong> {product.edad}</p>
                <p><strong>Curso:</strong> {product.curso}</p>
                <p><strong>Estado Matrícula:</strong> {product.estadoMatricula}</p>
            </div>
            <div>
                <button
                    className="btn btn-info me-2"
                    onClick={() => onViewApoderado(product._id)}
                >
                    Apoderado
                </button>
                <button
                    className="btn btn-info"
                    onClick={() => onViewMatricula(product._id)}
                >
                    Matrícula
                </button>
            </div>
        </li>
    );
};

export default ProductItem;
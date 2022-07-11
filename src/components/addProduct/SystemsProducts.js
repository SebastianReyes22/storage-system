import { Table, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';

export const SystemsProducts = ({
  handleSubmit,
  inputFocus,
  name,
  setName,
  products,
  handleClean,
  handleDelete,
  handleChange,
  handleSave,
}) => {
  return (
    <div className='component'>
      <Col className='mt-2 col-sm-11 mb-5'>
        <Card className='card-style-bitacora'>
          <Card.Header className='titleLogin'>
            Añadir/Quitar stock al inventario
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm='8'>
                  <Form.Group className='mb-4' controlId='formBasicName'>
                    <Form.Control
                      autoFocus
                      ref={inputFocus}
                      type='text'
                      placeholder='Código, descripción marca o nombre del producto'
                      autoComplete='off'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col sm='2' className='mb-4'>
                  <div className='d-grid gap-2'>
                    <Button variant='primary' onClick={handleSubmit}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </div>
                </Col>
                <Col sm='2' className='mb-4'>
                  <div className='d-grid gap-2'>
                    <Button variant='danger' onClick={handleClean}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className='table-style2'>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Marca</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Descripción</th>
                      <th>Última fecha de actualización</th>
                      <th>Código</th>
                      <th>Añadir</th>
                      <th>Quitar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map(product => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.mark}</td>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>{product.description}</td>
                          <td>{product.date}</td>
                          <td>{product.serial_number}</td>
                          <td>
                            <div className='d-grid gap-2'>
                              <Button
                                variant='primary'
                                onClick={e => handleSave(e, product)}>
                                +1
                              </Button>
                            </div>
                          </td>
                          <td>
                            <div className='d-grid gap-2'>
                              <Button
                                variant='danger'
                                onClick={e => handleDelete(e, product)}>
                                -1
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

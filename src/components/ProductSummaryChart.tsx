import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ProductChartData, fetchProductSummaries } from '../services/DashboardService';

interface ProductSummaryChartProps {
    year: string;
    month: number | '';
}

export const ProductSummaryChart: React.FC<ProductSummaryChartProps> = ({ year, month }) => {

    const [productData, setProductData] = useState<ProductChartData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProductData = await fetchProductSummaries(year, month);
            setProductData(fetchedProductData);
            console.log("Fetched Product Data:", fetchedProductData);
        };
    fetchData();
    }, [year,month]);

    const chartOptions = {
        chart: {
            type: 'bar',
            height: '300px'
        },
        title: {
            text: 'Product price and quantity'
        },
        xAxis: {
            categories: productData.map(item => item.name)
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        legend:{
            enabled:false,
        },
        credits:{
            enabled:false,
        },
        series: [{
            name: 'Price',
            data: productData.map(item => item.price),
            color: '#7cb5ec'
        }, {
            name: 'Quantity',
            data: productData.map(item => item.quantity),
            color: '#90ed7d'
        }]
    };

    const chartContainerStyle = {
        flexBasis: '33.33%',
        padding: '10px',
        border: '1px solid #dcdcdc',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)',
    };

  return (
    <div style={{ marginBottom: '20px', padding: '1rem' }}>
        <div style={chartContainerStyle}>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Product</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Price</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.map((product, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                            <td style={{ padding: '8px' }}>{product.name}</td>
                            <td style={{ padding: '8px' }}>{product.price.toFixed(2)}</td>
                            <td style={{ padding: '8px' }}>{product.quantity} units</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
